const TRIVIA_APP_BASE_URL = "https://opentdb.com/api.php?";
const QUESTION_TYPE = "multiple"; // multiple choice by default
const DIFFICULTIES = ["easy", "medium", "hard"];
const DIFFICULTY = DIFFICULTIES[0]; // easy
const ENCODING = ""; // put nothing for default encoding
export class TriviaApi {
  constructor() {
    this.baseUrl = TRIVIA_APP_BASE_URL;
  }

  getQuery(numberOfQuestions, category, difficulty, questionType) {
    let query = this.baseUrl;

    if (typeof numberOfQuestions === "number" && numberOfQuestions > 0) {
      query += `amount=${this.numberOfQuestions}`;
    }

    if (typeof category === "number") {
      // unsure of all category numbers, another check should be added here
      query += `&category=${category}`;
    }

    if (this.isValidDifficulty(difficulty)) {
      query += `&difficulty=${difficulty}`;
    }

    if (typeof questionType === "string" && questionType === QUESTION_TYPE) {
      query += `&type=${QUESTION_TYPE}`;
    }

    return query;
  }

  isValidDifficulty(difficulty) {
    return (
      typeof difficulty === "string" &&
      (difficulty === DIFFICULTIES[0] ||
        difficulty === DIFFICULTIES[1] ||
        difficulty === DIFFICULTIES[2])
    );
  }

  async getTrivia() {
    try {
      const response = await axios.get(
        `${this.baseUrl}amount=10` //simple query with 10 questions
      );
      console.log(response.data); // should return array of question objects
      return response.data;
    } catch (error) {
      console.log(`Catching error from api call`, error);
    }
  }

  // another version of getTrivia with more options, for getting a single question only
  async getTriviaQuestion(category, difficulty, questionType) {
    try {
      const response = await axios.get(
        this.getQuery(10, category, difficulty, questionType)
      );
      console.log("response.data in getTriviaQuestion:", response.data); // should return array of question
      return response.data;
    } catch (error) {
      console.log(`Catching error from api call`, error);
    }
  }
}

export default TriviaApi;
export {
  TRIVIA_APP_BASE_URL,
  QUESTION_TYPE,
  DIFFICULTIES,
  DIFFICULTY,
  ENCODING,
};
