import "./BookConfirmation.scss";
import React from "react";
import Button from "@mui/material/Button";
import { ReactComponent as ConfirmationOK } from "../../assets/icons/confirm-ok.svg";
import { ReactComponent as ZoneIcon } from "../../assets/icons/zone.svg";
import { ReactComponent as DeskIcon } from "../../assets/icons/desk.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
import { ReactComponent as FloorIcon } from "../../assets/icons/floor.svg";

export default class BookConfirmation extends React.Component {
  render() {
    return (
      <div className="bookconfirmationcontainer">
        <div className="bookconfirmationcontainer__header">
          <h1>Your Desk is confirmed!</h1>
          <ConfirmationOK />
        </div>
        <div className="bookconfirmationcontainer__choice">
          <div>
            <ZoneIcon /> {this.props.deskSelected.zone}
          </div>
          <div>
            <DeskIcon /> {this.props.deskSelected.desk}
          </div>
          <div>
            <DateIcon /> {this.props.dateSelected}
          </div>
          <div>
            <FloorIcon /> {this.props.deskSelected.floor}
          </div>
        </div>
        <div className="bookconfirmationcontainer__actions">
          <Button
            variant="contained"
            onClick={(event) => {
              event.preventDefault();
              this.props.history.push("/");
              this.props.history.go();
            }}
          >
            Add to Calendar
          </Button>

          <Button
            variant="contained"
            onClick={(event) => {
              event.preventDefault();
              this.props.history.push("/");
              this.props.history.go();
            }}
          >
            Return to home
          </Button>
        </div>
      </div>
    );
  }
}
