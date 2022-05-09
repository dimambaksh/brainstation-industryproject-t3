import { Button, TextField } from "@mui/material";
import React from "react";
import axios from "axios";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import "./Home.css";

export default class Home extends React.Component {
  state = {
    reserveClicked: false,
    reservationsLoaded: false,
    userReservations: [],
  };

  componentDidUpdate(prevProps, prevState) {
    //logic to prevent infinite axios hits
    //axios get reservations
    //save reservations to state
    if (
      this.state.reserveClicked &&
      this.state.reserveClicked !== prevState.reserveClicked
    ) {
      console.log("Redirecting");
      this.props.history.push("/reserve");
      this.props.history.go();
    }
  }

  componentDidMount() {
    this.getUserReservations();
  }

  shouldComponentUpdate() {
    return this.state.reservationsLoaded;
  }

  getUserReservations = async () => {
    await axios({
      method: "get",
      url: `http://localhost:8080/reserve/${sessionStorage.getItem(
        "loggedIn"
      )}`,
    })
      .then((response) => {
        console.log(response.data.reservations.currentReservations);
        
        this.setState(
          { userReservations: response.data.reservations.currentReservations },
          () => {
            this.setState({ reservationsLoaded: true });
          }
        );
      })
      .catch((error) => {
        //console.error(error);
        alert(`Server Response: User not found.`);
      });
  };

  render() {
    //if reservations in state make <ReservationCard /> jsx
    return (
      <div className="Home">
        <h1>Your Office: MPI Partners</h1>
        <div className="Home__Building dropShadow">
          <p>8 Adelaide St W Suite 200, Toronto, ON</p>
        </div>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log(event);
            //this.setState({ reserveClicked: true });
            this.props.history.push("/reserve");
            this.props.history.go();
          }}
        >
          Book a desk
        </Button>
        {/* href="/reserve" */}
        {/* <Link to="/reserve">Reserve a Spot</Link> */}
        <h2>Your upcoming reservations</h2>
        {this.state.reservationsLoaded
          ? this.state.userReservations.map((reservation) => {
              return (
                <ReservationCard
                  key={reservation.uuid}
                  uuid={reservation.uuid}
                  date={reservation.reservationdate}
                  floor={reservation.floor}
                  zone={reservation.zone==="collaborative"?"Collaborative":"Social Distance"}
                  desk={reservation.desk.split("-")[0]}
                  screening={reservation.safetypass?"pass":"incomplete"}
                />
              );
            })
          : ""}
      </div>
    );
  }
}
