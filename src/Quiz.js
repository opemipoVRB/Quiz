import { Component } from "react";
import questions from "./data/questions";
import Question from "./pages/question/Question";

const quiz = questions;
class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      questionCards: [
        {
          id: "",
          question: "",
          options: [],
          answer: "",
        },
      ],
      currentQuestion: 0,
      score: 0,
      start: false,
    };
  }

  componentDidMount() {
    this.getQuestion(quiz);
  }

  start = () => {
    this.setState({
      start: true,
    });
  };

  getQuestion = (quiz) => {
    let queries = quiz.questions_answers;
    let correctAnswers = [];
    let questions = [];
    let question;

    for (const [index, query] of queries.entries()) {
      for (const [index_j, answer] of query.answers.entries()) {
        if (answer.is_true === true) {
          correctAnswers.push(answer.text);
        }
      }
      question = {
        id: index + 1,
        question: query.text,
        options: query.answers,
        answer: correctAnswers[index],
      };
      questions.push(question);
    }

    this.setState({
      questionCards: questions,
    });
  };

  render() {
    return (
      <div className="container">
        {!this.state.start ? (
          <div className="card">
            <div>
              <h1>{quiz.title}</h1>
              <br />
              <br />

              <button onClick={this.start}>Click to start</button>
            </div>
          </div>
        ) : (
          <Question
            key={this.state.currentQuestion}
            questionCards={this.state.questionCards}
            currentQuestion={this.state.currentQuestion}
          />
        )}
      </div>
    );
  }
}
export default Quiz;
