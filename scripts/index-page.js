import TriviaApi from "./TriviaApi.js";

const triviaApi = new TriviaApi();
const questionListEl = document.querySelector(".question-list");
const answersListEl = document.querySelectorAll(".inputs__btn");
const balanceDisplayEl = document.querySelector(".player-balance");
let questions = []; // store question from api
let currentQuestion = 0; // keep track of the question displayed
let balance = 0;

// Create and set element function
const createElement = (element, elementClass) => {
  const createdElement = document.createElement(element);
  createdElement.classList.add(elementClass);
  return createdElement;
};

// Updates balance value depending on correct answer & changes the color green or red depending on correct or incorrect value
function updateAndDisplayBalance() {
  balanceDisplayEl.innerText = balance;
}

// display function
async function displayQuestionAndAnswer() {
  try {
    // check if the current question is less than the array
    if (currentQuestion < questions.length) {
      const singleQuestion = questions[currentQuestion]; // get a single question

      // display the question
      const questionCardEl = createElement("li", "question__card"); // create card element to contain (question)
      const questionEl = createElement("p", "question__card-content"); // create li element -> for question
      questionEl.innerText = decodeURIComponent(singleQuestion.question); // set inner li to question property of object
      questionCardEl.append(questionEl); // append trivia question to card element
      questionListEl.append(questionCardEl); // append card with question to list
      displayAnswers(singleQuestion); // display answers from question
    } else {
      console.log("You have lost");
    }
  } catch (error) {
    console.log("Could not fetch questions", error);
  }
}

// display answers
function displayAnswers(question) {
  answersListEl.innerHTML = "";
  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  allAnswers.forEach((answer, index) => {
    answersListEl[index].innerText = decodeURIComponent(answer);
  });
}

// function for users answers
function answerLogic(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    balance += 100000;
    updateAndDisplayBalance();
    updateProgressBar();
    questionListEl.innerHTML = ""; // clear previous question
    answersListEl.innerHTML = ""; // clear previous answers
    currentQuestion++;
    console.log("Current Question:", currentQuestion);
    displayQuestionAndAnswer(); // get the question and display next one
  } else {
    console.log("Incorrect Answer!");
    balance -= 100000; // decrease the balance
  }
}

// submit button
const selectButton = () => {
  answersListEl.forEach((answer) => {
    // grab all buttons and add listener
    answer.addEventListener("click", async (event) => {
      try {
        event.preventDefault();
        const selectedAnswer = event.target.innerText; // selected button
        const correctAnswer = questions[currentQuestion].correct_answer; // get answer from array
        const formatSelectedAnswer = selectedAnswer.trim().toLowerCase(); // trim whitespace and lowercase to match for selected answer
        const formatCorrectAnswer = correctAnswer.trim().toLowerCase(); // trim whitespace and lowercase to match for correct answer
        console.log(
          `seeing if they equal to: ${
            formatCorrectAnswer === formatSelectedAnswer
          }`
        );
        console.log(
          "format selected answer in event listener:",
          formatSelectedAnswer
        );
        console.log(
          "format correct answer in event listener:",
          formatCorrectAnswer
        );

        answerLogic(formatSelectedAnswer, formatCorrectAnswer); // check if they are equal
      } catch (error) {
        console.log("Could not display next question", error);
      }
    });
  });
};

// update Progress Bar
function updateProgressBar() {
  let progressBar = document.querySelector(".progress_bar__progress");
  progressBar.style.width = currentQuestion * 10 + "%";
}

// main point of execution
async function main() {
  console.log("Running main()...");
  try {
    questions = await triviaApi.getTrivia(); // fetch 10 questions from api and store in array
    displayQuestionAndAnswer(); // display one question
    selectButton(); // on click checks answers
  } catch (error) {
    console.log("Could not fetch the questions", error);
  }
}

main(); // call main
