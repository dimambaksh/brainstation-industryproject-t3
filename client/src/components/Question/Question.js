import { Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import React from "react";
import "./Question.css";

export default class Question extends React.Component {
  constructor(props) {
    super(props);

    const checkboxes = {};
    props.question.options.forEach(option => checkboxes[option] = false);
    
    this.state = { checked: {...checkboxes}};
  }

  handleChange = (e) => {
    this.setState({checked: {...this.state.checked, [e.target.name]: e.target.checked}});
  }

  validateCheckboxes = () => {
    const asArray = Object.entries(this.state.checked);
    const filtered = asArray.filter(([key, value]) => value === true).map(item => item[0]);
    
    return (filtered.length === 1 && filtered[0] === "None of the above")
  }

  componentDidMount() {}
  

  render() {
    return (
      <div className="Question">
        {(this.props.question.type === "pass") ? <h1 className="Question__Title centered">{this.props.question.title}</h1> : <h1 className="Question__Title">{this.props.question.title}</h1>}
        
        
        {/* Checkbox question type */}
        {(this.props.question.type === "checkbox" && this.state.checked != null) ? (
          <>
          <p className="Question__Instructions">Select “None of the above” if you have already completed your isolation period of 10 days.</p>
          <div className="Question__CheckboxList">
            <FormGroup>
              {this.props.question.options.map((symptom, i) => (
                <FormControlLabel
                  control={<Checkbox name={symptom} checked={this.state.checked[symptom]} onChange={(event) => this.handleChange(event)}/>}
                  label={symptom}
                />
              ))}
            </FormGroup>

          </div>
          <div className="ButtonFlex">
            <Button
              variant="contained"
              onClick={() => this.props.listener(this.validateCheckboxes())}
            >
              Continue
            </Button>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* 2 button Yes No question type */}
        {this.props.question.type === "yes-no" ? (
          <div>
            <p className="Question__Body">{this.props.question.body}</p>
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
            <p className="Question__Body">{this.props.question.upper_title}</p>
            <ul>
              {this.props.question.upper_bullets.map((bullet) => (
                <li>{bullet}</li>
              ))}
            </ul>
            <p className="Question__Body">{this.props.question.lower_title}</p>
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
      </div>
    );
  }
}
