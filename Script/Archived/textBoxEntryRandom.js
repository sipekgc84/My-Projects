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
        if (answer.includes(userAnswer)) {
            inputElement.style.backgroundColor = 'green';
        } else {
            inputElement.style.backgroundColor = 'red';
            allCorrect = false;

            // If attempts reach 3, show the correct answer
            if (attempts[questionId] >= 3) {
                inputElement.value = answer[0]; // Display the first correct variation
            }
        }
    });

    // Display result message
    if (allCorrect || attempts[questionId] >= 3) {
        const question = questions[currentQuestionIndex];
        const imageElement = document.querySelector('.question-image');
        imageElement.src = question.alternateImage; // Display alternate image

        if (allCorrect) {
            resultElement.textContent = "Correct, Great Job!";
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = "The correct answers you missed are in Red. Better luck next time.";
            resultElement.style.color = 'red';
            // Hide the button after 3 attempts
            checkButton.style.display = 'none';
        }

        // Reset attempts counter after success or 3 attempts
        attempts[questionId] = 0;
    } else {
        resultElement.textContent = "Incorrect, Try again.";
        resultElement.style.color = 'red';
    }
}

// Function to load the next question
function nextQuestion() {
    currentQuestionIndex++;

    // Check if there are more questions left
    if (currentQuestionIndex < questions.length) {
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
    } else {
        // Optionally handle end of questions
        alert('You have completed all questions!');
    }
}

// Generate text boxes for the first question on initial load
generateTextBoxes(questions[currentQuestionIndex]);
