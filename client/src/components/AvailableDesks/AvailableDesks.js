import "./AvailableDesks.scss";
import React from "react";
import Button from "@mui/material/Button";
import Desks from "../Desks/Desks";

export default class AvailableDesks extends React.Component {
  handleDeskClick = (event, desk) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(desk);
  };

  render() {
    return (
      <div className="availabledeskscontainer">
        <h1>Available Desks</h1>
        <div className="floorlayout">
          <Desks deskClick={this.handleDeskClick} />
        </div>
        <Button
          variant="contained"
          onClick={(event) => {
            this.props.nextStage();
          }}
        >
          Confirm
        </Button>
      </div>
    );
  }
}
