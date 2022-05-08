import React from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const questions = [
  {
    type: "checkbox",
    title: "In the last 10 days, have you experienced any of these symptoms?",
    options: ["Fever or chills", "Cough or barking cough (croup)", "Shortness of breath", "Decrease or loss of taste or smell", "Muscle aches/joint pain", "Extreme tiredness", "Sore throat", "Runny or stuffy/congested nose", "Headache", "Nausea, vomiting, and/or diarrhea", "None of the above"],
  },
  {
    type: "yes-no",
    title:
      "In the last 14 days, have you travelled outside of Canada and been told to quarantine (per the federal quarantine requirements)?",
    body: "",
  },
  {
    type: "yes-no",
    title:
      "Has a doctor, health care provider, or public health unit told you that you should currently be isolating (staying at home)?",
    body: "This can be because of an outbreak or contact tracing.",
  },
  {
    type: "yes-no",
    title: "In the last 10 days, have you tested positive for COVID-19?",
    body: "This includes a positive COVID-19 test result on a lab-based PCR test, rapid molecular test, rapid antigen test, or home-based self-testing kit.",
  },
  {
    type: "yes-no-bullets",
    title: "Do any of the following apply?",
    upper_title: "You live with someone who is:",
    upper_bullets: [
      "currently isolating because of positive test",
      "currently isolating because of COVID-19 symptoms",
      "currently isolating while waiting for COVID-19 test results",
    ],
    lower_title: `Select "no" if:`,
    lower_bullets: [
      "You are 18 or older and boosted",
      "You are 17 or younger and fully vaccinated",
      "You have completed isolation after testing positive in the last 90 days",
      "Your household member is isolating because of COVID-19 symptoms but has already tested negative on one PCR or rapid molecular test, or two rapid antigen tests",
    ],
  },
  {
    type: "pass",
    title: "Health Screening Passed!",
  },
];

export default class Quiz extends React.Component {
  state = {
    questionIndex: 0,
    fail: false,
    question: questions[0],
  };

  // Pass all of these questions to earn a checkmark

  nextQuestion = (aValue) => {
    console.log(`next question: ${aValue}`);
    if (aValue === false) {
      this.setState({ fail: true });
    }

    if (aValue === true && this.state.questionIndex < 5) {
      this.setState({
        questionIndex: this.state.questionIndex + 1,
        question: questions[this.state.questionIndex + 1],
      });
    } else if (aValue === true && this.state.questionIndex === 5) {
      //axios update reservation on server to show pass
      //then
      this.setState({ questionIndex: 6 });
    }
  };

  render() {
    return (
      <div className="Quiz">
        {(this.state.questionIndex < 5 && this.state.fail === false) ? (<p className="Quiz__Progress">Screening Question {this.state.questionIndex + 1}/5</p>) : (<></>)}
        {this.state.fail ? (
          <Question
            question={{ title: "Stay home and rest up!", type: "fail" }}
          />
        ) : (
          <Question
            question={this.state.question}
            listener={this.nextQuestion}
          />
        )}
      </div>
    );
  }
}
