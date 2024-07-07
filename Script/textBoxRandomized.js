// Function to shuffle the questions array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle questions array 
shuffleArray(questions);

let currentQuestionIndex = 0; // Track the current question index

// Initialize attempts counter for each question
let attempts = {};

// Function to generate text boxes based on the number of answers
function generateTextBoxes(question) {
    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = ''; // Clear previous text boxes

    question.answers.forEach((_, index) => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute('for', `box${index + 1}`);
        label.textContent = `${index + 1}.`;

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `box${index + 1}`);
        input.setAttribute('placeholder', `Label ${index + 1}`);

        div.appendChild(label);
        div.appendChild(input);
        inputContainer.appendChild(div);
    });
}

// Function to check answers for a specific question
function checkAnswers(questionId) {
    const resultElement = document.getElementById('result');
    const checkButton = document.querySelector('button');

    // Initialize attempts counter for this question if not already initialized
    if (!attempts[questionId]) {
        attempts[questionId] = 0;
    }

    let allCorrect = true;

    // Increment attempts counter
    attempts[questionId] += 1;

    // Loop through each input box and check if the answer is correct
    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const inputElement = document.getElementById(`box${index + 1}`);
        const userAnswer = inputElement.value.trim().toLowerCase();

        // Check if the user's answer matches any of the correct variations for this question
        if (answer.map(a => a.toLowerCase()).includes(userAnswer)) {
            inputElement.style.backgroundColor = '#c4ffb7';
        } else {
            inputElement.style.backgroundColor = '#ffaaaa';
            allCorrect = false;

            // If attempts reach 3, show the correct answer
            if (attempts[questionId] >= 3) {
                inputElement.value = answer[0]; // Display the first correct variation
            }
        }
    });

    // Function to animate color transition
    function animateColorTransition(element, fromColor, toColor) {
        const text = element.textContent.trim();
        const letters = text.split('');

        // Clear existing content
        element.textContent = '';

        // Calculate animation duration based on the number of letters
        const animationDuration = letters.length * 0.1 + 's';

        // Generate keyframes for the animation
        let keyframes = `@keyframes colorTransition {
            0% {
                color: ${fromColor};
            }
            50% {
                color: ${toColor};
            }
            100% {
                color: ${fromColor};
            }
        }`;

        // Inject the keyframes into a style element
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        // Apply animation to each letter
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animation = `colorTransition ${animationDuration} infinite`;
            span.style.animationDelay = (index * 0.1) + 's'; // Delay each letter
            element.appendChild(span);
        });
    }

    // Display result message
    if (allCorrect || attempts[questionId] >= 3) {
        const question = questions[currentQuestionIndex];
        const imageElement = document.querySelector('.question-image');
        imageElement.src = question.alternateImage; // Display alternate image

        const resultContainer = document.getElementById('result-container');
        resultContainer.style.display = 'block'; // Ensure result container is visible

        if (allCorrect) {
            resultElement.style.color = 'green';
            resultElement.textContent = "Correct, Great Job!";
            animateColorTransition(resultElement, 'green', '#c4ffb7');
        } else {
            resultElement.style.color = 'red';
            resultElement.textContent = "The correct answers you missed are in Red. Great try!";
        }

        // Reset attempts counter after success or 3 attempts
        attempts[questionId] = 0;

        // Hide the 'Check Answers' button
        checkButton.style.display = 'none';
    } else {
        resultElement.textContent = "Incorrect, Try again.";
        resultElement.style.color = 'red';
    }
}

// Function to load the next question
function nextQuestion() {
    currentQuestionIndex++;

    // Check if there are more questions left
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0; // Reset question index
        shuffleArray(questions); // Reshuffle questions
    }

    const question = questions[currentQuestionIndex];
    const questionSection = document.getElementById('question1'); // Assuming the question section id is 'question1'

    // Update question image, title, and input placeholders
    const imageElement = questionSection.querySelector('.question-image');
    imageElement.src = question.image;
    imageElement.alt = `Question ${currentQuestionIndex + 1} Image`;

    const titleElement = questionSection.querySelector('h2');
    titleElement.textContent = question.title;

    // Generate new text boxes for the current question
    generateTextBoxes(question);

    // Reset result message
    const resultElement = document.getElementById('result');
    resultElement.textContent = '';
    resultElement.style.color = '';

    // Show check answers button
    const checkButton = questionSection.querySelector('button:first-of-type');
    checkButton.style.display = '';

    // Hide result container
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'none';
}

// Generate text boxes for the first question on initial load
generateTextBoxes(questions[currentQuestionIndex]);

// Optionally, you can include an event listener to initialize the first question on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    const questionSection = document.getElementById('question1');
    const imageElement = questionSection.querySelector('.question-image');
    const titleElement = questionSection.querySelector('h2');

    // Assuming questions array is defined and accessible from text box questions.js
    const initialQuestion = questions[0];

    // Set image source and alt text
    imageElement.src = initialQuestion.image;
    imageElement.alt = `Question 1 Image`;

    // Set title
    titleElement.textContent = initialQuestion.title;
});
