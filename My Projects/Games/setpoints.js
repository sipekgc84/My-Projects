document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submit");
  const showAnswerBtn = document.getElementById("showAnswer");
  const nextQuestionBtn = document.getElementById("nextQuestion");
  const result = document.getElementById("result");
  const answerDisplay = document.getElementById("answerDisplay");
  const question = document.getElementById("question");
  const answerInput = document.getElementById("answer");

  const questions = [
    {
      text: "1. What is the top stop?",
      answer: 10.5
    },
    {
      text: "2. How many RPM does 33 inch tire spin when the car is moving 60 MPH?",
      answer: 33
    },
    {
      text: "3. What is the value of 3+4?",
      answer: 7
    },
    {
      text: "4. What is the value of 2+0?",
      answer: 2
    },
    {
      text: "5. What is the value of 3+1?",
      answer: 4
    },
    {
      text: "6. What is the speed of the #30 motor?",
      answer: 30,
      unit: "RPM"
    },
    {
      text: "7. What is the power of the #50 generator?",
      answer: 50,
      unit: "KW"
    },
    {
      text: "8. What is the value of 9+4?",
      answer: 13
    },
    {
      text: "9. What is the value of 2+8?",
      answer: 10
    },
    {
      text: "10. What is the value of 5+5?",
      answer: 10
    },
    {
      text: "11. What is the current of the battery?",
      answer: 2.5,
      unit: "Amps"
    },
    {
      text: "12. What is the power of the #7 submarine?",
      answer: 7,
      unit: "HP"
    }
  ];
  function focusTextbox() {
    answerInput.focus();
  }

  let currentQuestion = null;
  let incorrectAnswers = [];
  let questionCount = 0;
  let isAnswerCorrect = false;


  submitBtn.addEventListener("click", function () {
    const answer = parseFloat(answerInput.value);
    if (answer === currentQuestion.answer) {
      result.textContent = "Correct, Great Job!";
      isAnswerCorrect = true;
      nextQuestionBtn.focus();
    } else {
      result.textContent = "Incorrect, try again.";
      isAnswerCorrect = false;
      incorrectAnswers.push(currentQuestion);
      focusTextbox();
    }
    result.style.display = "block";
    questionCount++;
  });
  

  answerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isAnswerCorrect) {
        nextQuestionBtn.click();
      } else {
        submitBtn.click();
      }
    }
  });
  

  nextQuestionBtn.addEventListener("click", function () {
    isAnswerCorrect = false;
    result.style.display = "none";
    answerDisplay.style.display = "none";
    if (questionCount === 10) {
question.textContent = "All questions have been answered! Please scroll down to review your failed questions. Good luck next time!";
document.getElementById("answer").style.display = "none";
submitBtn.style.display = "none";
showAnswerBtn.style.display = "none";
nextQuestionBtn.style.display = "none";
displayIncorrectAnswers();
} else {
  let randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];
  question.textContent = currentQuestion.text;
  result.textContent = "";
  answerDisplay.textContent = "";
  answerInput.value = "";
  questions.splice(randomIndex, 1);
  focusTextbox(); // Add this line to set focus on the answerInput after loading the next question
}
});

showAnswerBtn.addEventListener("click", function () {
  let answerText = "The answer is " + currentQuestion.answer;
  if (currentQuestion.hasOwnProperty("unit")) {
    answerText += " " + currentQuestion.unit;
  }
  answerDisplay.textContent = answerText;
  answerDisplay.style.display = "block";
});

function displayIncorrectAnswers() {
let incorrectAnswersDisplay = document.getElementById("incorrectAnswersDisplay");
incorrectAnswersDisplay.style.display = "block";

let incorrectAnswersList = document.getElementById("incorrectAnswersList");
incorrectAnswersList.innerHTML = "";
for (let i = 0; i < incorrectAnswers.length; i++) {
let listItem = document.createElement("li");
listItem.textContent = incorrectAnswers[i].text + " (Answer: " + incorrectAnswers[i].answer;
if (incorrectAnswers[i].hasOwnProperty("unit")) {
listItem.textContent += " " + incorrectAnswers[i].unit;
}
listItem.textContent += ")";
incorrectAnswersList.append(listItem);
}

let restartBtn = document.createElement("button");
restartBtn.id = "restartBtn";
restartBtn.textContent = "Generate New Quiz";
restartBtn.addEventListener("click", function() {
window.location.reload();
});

incorrectAnswersList.appendChild(restartBtn);
}

document.getElementById("answer").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
      const answer = parseFloat(document.getElementById("answer").value);
      if (answer === currentQuestion.answer) {
        result.textContent = "Correct, Great Job!";
      } else {
        submitBtn.click();
      }
    }
  });

  document.addEventListener("DOMcontentLoad", function() {
    const targetTextbox = document.getElementById("answer");
  
    function focusTextbox() {
      targetTextbox.focus();
    }
  });
  nextQuestionBtn.click();
  focusTextbox();
});