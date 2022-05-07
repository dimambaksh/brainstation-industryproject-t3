import "./BookDesk.scss";
import React from "react";
import Button from "@mui/material/Button";
import DateSelect from "../DateSelect/DateSelect";

export default class BookDesk extends React.Component {
  render() {
    return (
      <div className="bookdeskcontainer">
        <h1>Book a Desk</h1>
        <DateSelect></DateSelect>
        <Button
          variant="contained"
          onClick={(event) => {
            this.props.nextStage();
          }}
        >
          View Available Desks
        </Button>
      </div>
    );
  }
}
