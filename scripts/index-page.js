import TriviaApi from "./TriviaApi.js";
console.log("Hello trivia");
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
//     },]

// Result
// "results" -> returns array of questions
// question holds properties and array of inccorect answers
// need question, correct answer, incorrect answer

const triviaApi = new TriviaApi();
const questionListEl = document.querySelector(".questions-list");
const answersListEl = document.querySelector(".inputs__btn");
const balanceDisplayEl = document.querySelector(".player-balance");
const arrayOfQuestions = new Array;
// Create and set element function
const createElement = (element, elementClass) => {
    const createdElement = document.createElement(element);
    createdElement.classList.add(elementClass);
    return createdElement;
}

// question object
class Question{
    // // super basic constructor with just question, answer and array of incorrect answers
    // constructor(question,correct,incorrect){
    //     this.question = question; // string of questions
    //     this.correct = correct;// string with correct answer
    //     this.incorrect = incorrect;// array with 3 elements of strings

    // }
    // more advanced constructor with type, difficulty,category,question,correct_answer, incorrect_answer
    constructor(type, difficulty,category,question,correct_answer, incorrect_answer){
        this.type = type;
        this.difficulty = difficulty;
        this.category = category;
        this.question = question;
        this.correct = correct_answer;
        this.incorrect = incorrect_answer;
    }
    
    // process raw data straight from the api

    // input format example:
    /*
{"type":"multiple","difficulty":"easy","category":"Sports","question":"Which player holds the NHL record of 2,857 points?","correct_answer":"Wayne Gretzky","incorrect_answers":["Mario Lemieux ","Sidney Crosby","Gordie Howe"]}

    */
    // parseApiInput(input){
    // constructor(input){
    //     // let beginning = 0;
    //     // let end = 0;
    //     // const content = new Array();
    //     // // picks out all everything that's in quotations
    //     // for (let i=0; i<input.length;i++){
    //     //     if(input[i] === "\'" && (beginning <= end)){
    //     //         beginning = i+1;
    //     //         //console.log("beginning=" + beginning);
    //     //     }
    //     //     else if(input[i] === "\'"){
    //     //         end = i;
    //     //         //console.log("end=" + end);
    //     //         // console.log(input.slice(beginning, end));
    //     //         content.push(input.slice(beginning, end));
    //     //     }
    //     // }

    //     // for (let i=0; i<content.length;i++){
    //     //     if(content[i] === "type"){
    //     //         i++;
    //     //         this.type = content[i];
    //     //     }
    //     //     else if(content[i] === "difficulty"){
    //     //         i++;
    //     //         this.difficulty=content[i];
    //     //     }
    //     //     else if(content[i] === "category"){
    //     //         i++;
    //     //         this.category = content[i];
    //     //     }
    //     //     else if(content[i] === "question"){
    //     //         i++;
    //     //         this.question = content[i];
    //     //     }
    //     //     else if(content[i] === "correct_answer"){
    //     //         i++;
    //     //         this.correct = content[i];
    //     //     }
    //     //     else if(content[i] === "incorrect_answers"){
    //     //          i++;
    //     //          wrong.push(content[i]);
    //     //           i++;
    //     //          wrong.push(content[i]);
    //     //           i++;
    //     //          wrong.push(content[i]);
    //     //         this.incorrect= wrong;
    //     //     }
    //     // }
    // }

    toString(){
        return 
        "question is"+
        this.question 
        "answer is"+
        this.answer;
        
    }

    // takes a string of input
    // return a boolean of whether or not the answer is correct
    checkAnswerCorrect(input){
        if(this.answer === input){
            return true;
        }
        else{
            return false;
        }
    }
    
    // Updates balance value depending on correct answer & changes the color green or red depending on correct or incorrect value
    updateAndDisplayBalance() {
        const balance = 100000;
        const submittedElement = document.querySelector(".inputs__btn");
        if (this.checkAnswerCorrect(input) === true) {
            balance += 1000000;
            submittedElement = document.querySelector.remove(".inputs__btn");
            submittedElement = document.querySelector.add(".inputs__correct")
        } else {
            balance -= 1000;
            submittedElement = document.querySelector.remove(".inputs__btn");
            submittedElement = document.querySelector.add(".inputs__incorrect")
        }
        document.querySelector(".player-balance") = balance;
    }
}

// display function for single question
async function displaySingleQuestion(questions, index) {
    try {
        const questionCardEl = createElement("div", "question__card") // create card element to contain (title, question, answers)
        const questionEl = createElement("li", "question__card-content"); // create li element -> for question
        questionEl.innerText = questions[index].question; // set inner li to question property of object
        // questionInputEl. innerText = question.incorrect_answers; // set button text to value property of object incorrect answer
        questionListEl.append(questionEl);
    } catch (error) {
        console.log(error);
    }
}
// display function
async function displayQuestion(question) {
    try {
        // loop through array of question objects
        question.forEach((question) => {
            // for each question object
            const questionCardEl = createElement("div", "question__card") // create card element to contain (title, question)
            const questionEl = createElement("li", "question__card-content"); // create li element -> for question
            console.log("Error in line 165 display function",question);
            questionEl.innerText = question.question; // set inner li to question property of object
            questionCardEl.append(questionEl);
        }) 
    } catch (error) {
        console.log(error);
    }
}

// test call to console
async function testcall(){
    try {
        const questions = await triviaApi.getTrivia(); // gets questions from api call
        console.log("Questions in testcall():", questions.results); // returning array of question object 
        await displayQuestions(questions.results[0]);
    } catch (error) {
        console.log(`error from test`,error);
    }
}

// call test
// testcall();


async function displayIncorrectAnswers(incorrect_answers) {
    try {
    incorrect_answers.forEach(incorrect_answer => {
        const  incorrectAnswerEl = document.createElement("button");
        incorrectAnswerEl.innerText = incorrect_answer;
        incorrectAnswerEl.classList.add(".input__btn")
        answersListEl.appendChild(incorrectAnswerEl)
    })
    } catch (error) {
        console.log(error);
    }
}

async function testcall2() {
    try {
        const incorrect_answers = await triviaApi.getTrivia();
        console.log("answers", incorrect_answers.results[0]);
    } catch (error) {
        console.log("error from test2", error)
    }
}

// testcall2()
async function testcall3() {
    try {

        const questions = await triviaApi.getTrivia(); // gets questions from api call
        console.log("Questions in testcall():", questions.results);

        for(let i =0; i< 10;i++){
            rrayOfQuestions.push(new Question(questions.results[i].type,questions.results[i].type,questions.results[i].type,questions.results[i].type,questions.results[i].type,));
            console.log(questions.results[i]);
        }
        
        console.log(questions.results[0].type);
        let test = new Question(questions.results[0]);
        console.log(test.toString());
    } catch (error) {
        console.log("error from test2", error)
    }
}
testcall3();


// main point of execution
function main () {
    console.log('Running main()...');
    // step 0 - default loadout?
    // step 1 - display start page?, wait for user to press start
    // step 2 - get questions
        const question = triviaApi.getTriviaQuestion(9, 'easy', 'multiple');
        console.log('Questions received in main():', question);
        
    // step 3 - display question
    // step 4 - get answer from user
    // step 5 - update settings/display
    // step 6 - loop back to step 3 until no questions left
    // step 7 - display game results
}

main();