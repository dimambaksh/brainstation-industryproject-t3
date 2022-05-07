import "./AvailableDesks.scss";
import React from "react";
import Button from "@mui/material/Button";
import Desks from "../Desks/Desks";

export default class AvailableDesks extends React.Component {
  render() {
    return (
      <div className="availabledeskscontainer">
        <h1>Available Desks</h1>
        <div className="floorlayout">
          <Desks />
          <Desks />
          <Desks />
          <Desks />
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
