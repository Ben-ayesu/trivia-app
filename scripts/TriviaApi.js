const TRIVIA_APP_BASE_URL =
  "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
export class TriviaApi {
  constructor() {
    this.baseUrl = TRIVIA_APP_BASE_URL;
  }

  async getTrivia() {
    try {
      const response = await axios.get(
        `${this.baseUrl}` //simple query with 10 computer science questions
      );
      return response.data.results;
    } catch (error) {
      console.log(`Catching error from api call`, error);
    }
  }
}

export default TriviaApi;
