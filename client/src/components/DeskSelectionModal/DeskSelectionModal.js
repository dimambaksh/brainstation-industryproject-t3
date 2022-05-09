import "./DeskSelectionModal.scss";
import React from "react";
import Button from "@mui/material/Button";
import { ReactComponent as CancelIcon } from "../../assets/icons/close.svg";
import { ReactComponent as ZoneIcon } from "../../assets/icons/zone.svg";
import { ReactComponent as DeskIcon } from "../../assets/icons/desk.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
import { ReactComponent as FloorIcon } from "../../assets/icons/floor.svg";

export default class DeskSelectionModal extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="deskselectionmodal">
        <div className="deskselectionmodal__dialog dropShadow">
          <div className="deskselectionmodal__dialog__top">
            <div className="deskselectionmodal__dialog__top-close">
              <CancelIcon onClick={this.props.handleClose} />
            </div>
          </div>
          <div className="deskselectionmodal__dialog__body">
            <p className="centered">Your Selected Desk</p>

            <div className="deskselectionmodal__dialog__body__choice">
              <div className="flex-align">
                <ZoneIcon />{" "}
                <span className="capitalize">
                  {this.props.deskSelected.zone} Zone
                </span>
              </div>
              <div className="flex-align narrow">
                <DeskIcon />{" "}
                <span className="capitalize">
                  {this.props.deskSelected.desk}
                </span>
              </div>
              <div className="flex-align">
                <DateIcon />{" "}
                <span className="capitalize">{this.props.dateSelected}</span>
              </div>
              <div className="flex-align narrow">
                <FloorIcon />{" "}
                <span className="capitalize">
                  {this.props.deskSelected.floor}
                </span>
              </div>
            </div>
          </div>
          <div className="deskselectionmodal__dialog__actions">
            <Button
              fullWidth
              variant="contained"
              onClick={this.props.handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
