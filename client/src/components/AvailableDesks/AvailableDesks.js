import "./AvailableDesks.scss";
import React from "react";
import Desks from "../Desks/Desks";
import axios from "axios";
import DeskSelectionModal from "../DeskSelectionModal/DeskSelectionModal";
import { ReactComponent as NotAvailableLegend } from "../../assets/icons/notavailable_legend.svg";
import { ReactComponent as AvailableLegend } from "../../assets/icons/available_legend.svg";
import { ReactComponent as OccupiedLegend } from "../../assets/icons/occupied_legend.svg";
import { ReactComponent as SelectedLegend } from "../../assets/icons/selected_legend.svg";

export default class AvailableDesks extends React.Component {
  state = {
    reservations: {},
    showConfirmation: false,
    loaded: false,
  };

  componentDidMount() {
    console.log("Available Desks.");
    this.getPersonProfiles();
    this.setState({ loaded: true });
  }

  componentDidUpdate() {
    console.log("Updated.");
  }

  shouldComponentUpdate() {
    return this.state.loaded;
  }

  getPersonProfiles = () => {
    this.props.desksAvailable.desks.desksAvailable.map((desk) => {
      let deskReservation =
        this.props.desksAvailable.reservations.currentReservations.find(
          (reservation) => reservation.desk === desk.desk
        );
      if (deskReservation !== undefined) {
        this.getPersonImage(deskReservation, desk);
      }
    });
  };

  postDeskReservation = async () => {
     /**
     * {
     * desk: "D4-1",
     * floor: "1",
     * zone: "social",
     * person: "aarone.amino@gmail.com",
     * reservationdate: `05/09/2022`,
     * }//req.body;
     */
    await axios({
      method: "post",
      url: `http://localhost:8080/reserve`,
      data: {
        desk: this.props.deskSelected.desk,
        floor: this.props.deskSelected.floor,
        zone: this.props.deskSelected.zone,
        person: "dunc.macdonald@gmail.com",
        reservationdate: this.props.dateSelected,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        alert(`Server Response: ${error.response.data}`);
      });
  };

  getPersonImage = async (deskReservation, desk) => {
    console.log(deskReservation);
    await axios({
      method: "get",
      url: `http://localhost:8080/user/${deskReservation.person}`,
    })
      .then((response) => {
        let currentReservations = this.state.reservations;
        currentReservations[`${desk.desk}`] = response.data;
        this.setState({ reservations: currentReservations });
      })
      .catch((error) => {
        console.error(error);
        alert(`Server Response: ${error.response.data}`);
      });
  };

  handleClose = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showConfirmation: false });
  };

  handleConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.postDeskReservation();
    this.props.nextStage();
  };

  handleDeskClick = (event, desk) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(desk);
    if (desk.available === "false" || this.state.reservations[desk.desk]) {
      console.log("Desk cannot be selected");
      return true;
    } else {
      this.props.setDeskSelected(desk);
      this.setState({ showConfirmation: true });
    }
  };

  render() {
    return (
      <div className="availabledeskscontainer">
        <h1>Available Desks</h1>
        <div className="availabledeskscontainer__floorlayout">
          {this.state.loaded ? (
            <Desks
              reservationsList={this.state.reservations}
              desksAvailable={this.props.desksAvailable.desks.desksAvailable}
              deskClick={this.handleDeskClick}
            />
          ) : (
            ""
          )}
        </div>
        <div className="availabledeskscontainer__legend">
          <div className="availabledeskscontainer__legend-header">
            <h1>Legend</h1>
          </div>
          <div className="availabledeskscontainer__legend-text">
            <div>
              <NotAvailableLegend /> Not Available
            </div>
            <div>
              <AvailableLegend /> Available
            </div>
            <div>
              <OccupiedLegend /> Occupied
            </div>
            <div>
              <SelectedLegend /> Selected
            </div>
          </div>
        </div>
        {this.state.showConfirmation ? (
          <DeskSelectionModal
            dateSelected={this.props.dateSelected}
            deskSelected={this.props.deskSelected}
            handleClose={this.handleClose}
            handleConfirm={this.handleConfirm}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
