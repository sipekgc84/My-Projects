let currentQuestionIndex = 0; // Track the current question index

// Initialize attempts counter for each question
let attempts = {};

// Get references to HTML elements
const header = document.querySelector("header");
const topicSearch = document.getElementById("topicSearch");
const searchResultsContainer = document.getElementById("searchResults");
const topicsContainer = document.getElementById("topics");
const questionBody = document.getElementById("questionbody");
const questionSection = questionBody.querySelector("#question1");
const questionImage = questionSection.querySelector(".question-image");
const questionTitle = questionSection.querySelector("h2");
const resultElement = questionSection.querySelector("#result");
const inputContainer = questionSection.querySelector("#inputContainer");
const homeBtn = questionSection.querySelector("#home-btn");
const checkAnswerBtn = questionSection.querySelector("button");
const backBtn = document.getElementById("backBtn");
const footer = document.querySelector("footer");

// Create a separate array to store topics
const topics = Array.from(new Set(questions.map(q => q.topic))).sort();

// Set initial display of questionbody to none
questionBody.classList.add("hidden");

// Populate topics list
function populateTopicsList() {
  topicsContainer.innerHTML = topics
    .map(topic => `<a href="#" data-topic="${topic}">${topic}</a><br>`)
    .join("");

  // Add event listener to topic links
  topicsContainer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showQuestionBody(e.target.getAttribute("data-topic"));
    });
  });
}

// Show the question body and hide other sections
function showQuestionBody(topic) {
  questionBody.classList.remove("hidden");
  topicsContainer.classList.add("hidden");
  header.classList.add("hidden");
  footer.classList.add("hidden");
  document.body.classList.add("hide-background");
  displayQuestionByTopic(topic);
}

// Display question by topic
function displayQuestionByTopic(topic) {
  const questionIndex = questions.findIndex(q => q.topic === topic);
  if (questionIndex !== -1) {
    // Reset attempts for all questions
    questions.forEach(question => {
      attempts[question.id] = 0;
    });

    // Update current question index
    currentQuestionIndex = questionIndex;
    
    // Display the new question
    const questionData = questions[questionIndex];
    displayQuestion(questionData);
    displayImage(questionData);
    generateTextBoxes(questionData);
    resetUI(); // Reset UI state for new question
  }
}



// Display question text and title
function displayQuestion(questionData) {
  questionTitle.innerHTML = questionData.title;
}

// Display question image
function displayImage(questionData) {
  if (questionData.image) {
    questionImage.src = questionData.image;
    questionImage.alt = `Image related to ${questionData.title}`;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }
}

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
        input.setAttribute('autocomplete', 'off'); // Disable autocomplete

        div.appendChild(label);
        div.appendChild(input);
        inputContainer.appendChild(div);
    });
}

// Event listener for "Home" button
homeBtn.addEventListener("click", () => {
  questionBody.classList.add("hidden");
  topicsContainer.classList.remove("hidden");
  header.classList.remove("hidden");
  footer.classList.remove("hidden");
  document.body.classList.remove("hide-background");
});

// Reset UI state for new question
function resetUI() {
  resultElement.textContent = ""; // Clear result message
  checkAnswerBtn.style.display = "block"; // Show the "Check Answer" button
  inputContainer.querySelectorAll("input").forEach(input => {
    input.style.backgroundColor = ""; // Clear input background colors
    input.value = ""; // Clear input values
  });
}

// Update search results and position container under search bar
topicSearch.addEventListener("input", () => {
  const searchTerm = topicSearch.value.toLowerCase();
  searchResultsContainer.style.display = searchTerm ? "block" : "none";
  const filteredTopics = topics.filter(topic => topic.toLowerCase().includes(searchTerm));
  populateSearchResults(filteredTopics);
  positionSearchResultsContainer();
});

// Clear the search box contents when it gains focus
topicSearch.addEventListener("focus", () => {
  topicSearch.value = '';
  searchResultsContainer.style.display = "none";
});

// Populate search results container
function populateSearchResults(results) {
  searchResultsContainer.innerHTML = results
    .map(result => `<a href="#" class="search-result-link">${result}</a>`)
    .join("");
}

// Position search results container under search bar
function positionSearchResultsContainer() {
  const searchBarRect = topicSearch.getBoundingClientRect();
  searchResultsContainer.style.left = `${searchBarRect.left}px`;
  searchResultsContainer.style.top = `${searchBarRect.bottom}px`;
  searchResultsContainer.style.width = `${searchBarRect.width}px`;
}

// Handle clicking on search result
searchResultsContainer.addEventListener("click", event => {
  const selectedTopic = event.target.textContent;
  topicSearch.value = selectedTopic;
  searchResultsContainer.innerHTML = ""; // Clear search results
  searchResultsContainer.style.display = "none"; // Hide search results
  showQuestionBody(selectedTopic);
});

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

    // Display result message
    if (allCorrect || attempts[questionId] >= 3) {
        const question = questions[currentQuestionIndex];
        const imageElement = document.querySelector('.question-image');
        imageElement.src = question.alternateImage; // Display alternate image

        if (allCorrect) {
            resultElement.textContent = "Correct, Great Job!";
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = "The correct answers you missed are in Red. Great try!";
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

// Generate text boxes for the first question on initial load
generateTextBoxes(questions[currentQuestionIndex]);

// Event listener to initialize the first question on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    const questionSection = document.getElementById('question1');
    const imageElement = questionSection.querySelector('.question-image');
    const titleElement = questionSection.querySelector('h2');

    // Get the first question
    const initialQuestion = questions[0];

    // Set image source and alt text
    imageElement.src = initialQuestion.image;
    imageElement.alt = `Question 1 Image`;

    // Set title
    titleElement.textContent = initialQuestion.title;

    // Set up topics list
    populateTopicsList();

    // Disable autocomplete for all text input fields
    const inputElements = document.querySelectorAll('input[type="text"]');
    inputElements.forEach(input => {
        input.setAttribute('autocomplete', 'off');
    });
});
