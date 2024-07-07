// Get references to the HTML elements
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const footerContainer = document.getElementById("footer");

// Define a list of Categories used as the question banks
let CATEGORY = "General";
let currentCategoryQuestions = [];
let usedQuestions = [];
let currentQuestionIndex = 0;

// Adds return button to back out of question page
function returnhome() {
  const rtnhmeelement = document.getElementById("questionbody");
  const header = document.querySelector("header");
  header.classList.remove("hidden");
  rtnhmeelement.classList.add("hidden");
  footerContainer.style.display = "block";
}

// Define a function to generate a random question
function generateQuestion() {
  let unusedQuestions = currentCategoryQuestions.filter(q => !usedQuestions.includes(q));
  if (unusedQuestions.length === 0) {
    usedQuestions = [];
    unusedQuestions = currentCategoryQuestions;
  }
  const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
  const randomQuestion = unusedQuestions[randomIndex];
  usedQuestions.push(randomQuestion);
  return randomQuestion;
}

// Define a function to display a random question
function displayQuestion() {
  const question = generateQuestion()?.question;
  questionElement.innerHTML = "";
  if (question instanceof Array) {
    question.forEach(line => {
      let p = document.createElement("p");
      p.innerHTML = line;
      questionElement.appendChild(p);
    });
  } else {
    questionElement.innerHTML = question;
  }
  answerElement.innerHTML = "";
}

// Define a function to display the answer to the current question
function showAnswer() {
  answerElement.innerHTML = "";
  const question = questionElement.firstChild.textContent;
  const answer = currentCategoryQuestions.find(q => q.question[0] === question).answer;
  if (answer instanceof Array) {
    answer.forEach(line => {
      let p = document.createElement("p");
      p.innerHTML = line;
      answerElement.appendChild(p);
    });
  } else {
    answerElement.innerHTML = answer;
  }
}

// Define a function to hide the answer to the current question
function hideAnswer() {
  answerElement.innerHTML = "";
}

// Setting question body visible
function showQuestion(category) {
  const catTitle = document.getElementById("category-title");
  catTitle.textContent = category + " Questions";
  const questionBody = document.getElementById("questionbody");
  const header = document.querySelector("header");
  header.classList.add("hidden");
  questionBody.classList.remove("hidden");
  footerContainer.style.display = "none";
  CATEGORY = category;
  currentCategoryQuestions = questions.filter(q => q.category.includes(category));
  currentQuestionIndex = 0;
  displayQuestion();
}

// Define a function to display the next question
function nextQuestion() {
  displayQuestion();
  answerElement.innerHTML = "";
}

