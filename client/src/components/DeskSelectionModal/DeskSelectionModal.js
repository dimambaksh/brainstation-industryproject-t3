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
        <div className="deskselectionmodal__dialog">
          <div className="deskselectionmodal__dialog__top">
            <div className="deskselectionmodal__dialog__top-close">
              <button onClick={this.props.handleClose}>
                <CancelIcon />
              </button>
            </div>
          </div>
          <div className="deskselectionmodal__dialog__body">
            <div className="deskselectionmodal__dialog__body__text">
              <h1>Your Selected Desk</h1>
            </div>
            <div className="deskselectionmodal__dialog__body__choice">
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
          </div>
          <div className="deskselectionmodal__dialog__actions">
            <div className="deskselectionmodal__dialog__actions-confirm">
            <Button variant="contained" onClick={this.props.handleConfirm}>
          Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
