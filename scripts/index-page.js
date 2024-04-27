import TriviaApi from "./TriviaApi.js";

/* -------------------------------------------------------------------------- */
/*                               sample repsonse                              */
/* -------------------------------------------------------------------------- */
// "results": [
//     {
//       "type": "multiple",
//       "difficulty": "medium",
//       "category": "Science: Computers",
//       "question": "Which of these is the name for the failed key escrow device introduced by the National Security Agency in 1993?",
//       "correct_answer": "Clipper Chip",
//       "incorrect_answers": [
//         "Enigma Machine",
//         "Skipjack",
//         "Nautilus"
//       ]
//     },
// ]

const triviaApi = new TriviaApi();
const questionListEl = document.querySelector(".questions-list");
const answersListEl = document.querySelectorAll(".inputs__btn");
const balanceDisplayEl = document.querySelector(".player-balance");
let count = 0;
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
async function displayQuestion() {
  try {
    // for each question object
    // fetch a single question
    const questions = await triviaApi.getTriviaQuestion(9, "easy", "multiple"); // it gets 50 questions if i just request 1???
    console.log("Questions in displayQuestion:", questions);
    // Select the first 10 questions
    const selectedQuestions = questions.slice(0, 10);
    console.log("10 Questions only", selectedQuestions);
    const singleQuestion = questions.results[0];
    console.log("Question in displayQuestion:", singleQuestion);

    // display the question
    const questionCardEl = createElement("li", "question__card"); // create card element to contain (question)
    const questionEl = createElement("p", "question__card-content"); // create li element -> for question
    questionEl.innerText = singleQuestion.question; // set inner li to question property of object
    questionCardEl.append(questionEl);
    questionListEl.append(questionCardEl); // append card with question to list

    displayAnswers(
      singleQuestion.incorrect_answers,
      singleQuestion.correct_answer
    );
  } catch (error) {
    console.log(error);
  }
}

// display answers
function displayAnswers(incorrect_answers, correctAnswer) {
  const allAnswers = [...incorrect_answers, correctAnswer];
  try {
    console.log("All answers from display answers");
    const answerButtons = document.querySelectorAll(".inputs__btn");
    console.log("Answer buttons:", answerButtons); // Debug statement
    allAnswers.forEach((answer, index) => {
      answersListEl[index].innerText = answer;
      //   const answerEl = createElement("button", "input__btn");
      //   answerEl.innerText = answer;
      //   answersListEl.appendChild(answerEl);
    });
  } catch (error) {
    console.log(error);
  }
}

// function for users answers
function answerLogic(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    balance += 100000;
  } else {
    balance += 100000;
  }
  count++; // next question
  updateAndDisplayBalance(); // update balance
  updateProgressBar(); // update progress bar
  questionListEl.innerHTML = ""; // Clear previous question
  answersListEl.innerHTML = ""; // Clear previous answers
  displayQuestion(); // Display next question
}

// submit button
const selectButton = () => {
  console.log("inside select button list of buttons", answersListEl);
  answersListEl.forEach((answer) => {
    console.log("current answer", answer);
    answer.addEventListener("click", async (event) => {
      try {
        event.preventDefault();
        alert("Button works");
        const selectedAnswer = answer.innerText;

        answerLogic(selectedAnswer);
      } catch (error) {
        console.log("Could not display next question", error);
      }
    });
  });
};

function updateProgressBar() {
  let progressBar = document.querySelector(".progress_bar__progress");
  progressBar.style.width = count * 10 + "%";
}

// main point of execution
function main() {
  console.log("Running main()...");
  // step 0 - default loadout?
  // step 1 - display start page?, wait for user to press start
  // step 2 - get question
  // step 3 - display question
  displayQuestion();
  selectButton(); //set up event listeners
  updateProgressBar();

  // step 4 - get answer from user

  // step 5 - update settings/display
  // step 6 - loop back to step 3 until no questions left
  // step 7 - display game results
}

main();
