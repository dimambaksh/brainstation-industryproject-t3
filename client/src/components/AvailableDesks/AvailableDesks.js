import "./AvailableDesks.scss";
import React from "react";
import Button from "@mui/material/Button";
import Desks from "../Desks/Desks";
import axios from "axios";

export default class AvailableDesks extends React.Component {
  state = {
    reservations: {},
    loaded: false,
  };

  componentDidMount() {
    console.log("Available Desks.");
    this.getPersonProfiles();
    this.setState({loaded: true});
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
