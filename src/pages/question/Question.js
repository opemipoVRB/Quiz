import { Component } from "react";

class Question extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      score: 0,
      currentQuestion: 0,
      showScore: false,
    };
  }

  selectedAnswer = (choice, button) => {
    console.log("ID", button);
    let color = choice.is_true ? "correct" : "incorrect";
    let element = document.getElementById(button);
    window.confirm(" Are you sure?");
    element.classList.add(color);

    if (choice.is_true) {
      this.setState({
        score: this.state.score + 1,
      });
    }

    console.log("Your Choice", choice.text);

    const nextQuestion = this.state.currentQuestion + 1;
    if (nextQuestion < this.props.questionCards.length) {
      setTimeout(() => {
        this.setState({
          currentQuestion: nextQuestion,
        });
        element.classList.remove(color);
      }, 500);
    } else {
      setTimeout(() => {
        this.setState({ showScore: true });
      }, 500);
    }
  };

  render() {
    let options = this.props.questionCards[this.state.currentQuestion].options;
    console.log("Options ", options);
    console.log("Score ", this.state.score);
    return (
      <div className="card">
        {this.state.showScore ? (
          <div className="score-section">
            <h1>
              Scored {this.state.score} out of{" "}
              {this.props.questionCards.length}{" "}
            </h1>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>
                  Question{" "}
                  {this.props.questionCards[this.state.currentQuestion].id}
                </span>
                /{this.props.questionCards.length}
              </div>
              <div className="question-text">
                {this.props.questionCards[this.state.currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              {options.map((value, index) => {
                return (
                  <div key={index}>
                    <button
                      id={index.toString()}
                      onClick={() => {
                        this.selectedAnswer(value, index.toString());
                      }}
                    >
                      {value.text}
                    </button>
                    <br />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}
export default Question;
