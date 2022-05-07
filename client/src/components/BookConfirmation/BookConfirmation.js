import "./BookConfirmation.scss";
import React from "react";
import Button from "@mui/material/Button";

export default class BookConfirmation extends React.Component {
  render() {
    return (
      <div className="bookconfirmationcontainer">
        <h1>Desk is booked!</h1>
        <Button
          variant="contained"
          onClick={(event) => {
            this.props.nextStage();
          }}
        >
          Add to Calendar
        </Button>
        <Button
          variant="contained"
          onClick={(event) => {
            this.props.nextStage();
          }}
        >
          Return to home
        </Button>
      </div>
    );
  }
}
