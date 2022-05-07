import { Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import React from "react";
import "./Question.css";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: [false,false,false]};
  }

  checkedListener = (i) => {
      this.setState({checked: [...this.statechecked]});
  }

  //   componentDidUpdate() {
  //       if(this.state.title !== this.props.question.title){
  //           this.setState(...this.props.question)
  //       }
  //     console.log(this.props.question);

  //   }

  render() {
    return (
      <div className="Question">
        <h1 className="Question__Title">{this.props.question.title}</h1>
        {/* Checkbox question type */}
        {this.props.question.type === "checkbox" ? (
          <div>
            <FormGroup>
              {this.props.question.options.map((symptom) => (
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={symptom.big_text}
                />
              ))}
            </FormGroup>
            <div className="ButtonFlex">
            <Button
              variant="contained"
              onClick={() => this.props.listener(true)}
            >
              Continue
            </Button>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* 2 button Yes No question type */}
        {this.props.question.type === "yes-no" ? (
          <div>
            <p>{this.props.question.body}</p>
            <div className="ButtonFlex">
              <Button
                variant="outlined"
                onClick={() => this.props.listener(false)}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => this.props.listener(true)}
              >
                No
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* 2 button Yes No question type with bullet points */}
        {this.props.question.type === "yes-no-bullets" ? (
          <div>
            <p>{this.props.question.upper_title}</p>
            <ul>
              {this.props.question.upper_bullets.map((bullet) => (
                <li>{bullet}</li>
              ))}
            </ul>
            <p>{this.props.question.lower_title}</p>
            <ul>
              {this.props.question.lower_bullets.map((bullet) => (
                <li>{bullet}</li>
              ))}
            </ul>
            <div className="ButtonFlex">
              <Button
                variant="outlined"
                onClick={() => this.props.listener(false)}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => this.props.listener(true)}
              >
                No
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* You passed the quiz */}
        {this.props.question.type === "pass" ? (
          <div>
            <p>Health and safety tips</p>
            <ul>
              <li>Keep a distance of at least 2 metres</li>
              <li>
                Make sure you wear a face covering or mask while indoors (and
                outdoors when you cannot physically distance) and that it covers
                your mouth, nose, and chin
              </li>
            </ul>
            <div className="ButtonFlex">
              <Button href="/" variant="contained">
                Back to home
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Failed quiz */}
        {this.props.question.type === "fail" ? (
          <div>
            <p className="centered">
              We recommend that you stay home to protect the health and safety
              of the people you work with.
            </p>
            <p>Next Steps</p>
            <ul>
              <li>Tell your employer about this result</li>
              <li>
                You should isolate (stay home) and not leave except to get
                tested, to visit a clinical assessment centre, or for a medical
                emergency
              </li>
            </ul>
            <div className="ButtonFlex">
              <Button href="/" variant="contained">
                Cancel reservation
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
