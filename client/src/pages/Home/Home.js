import { Button } from "@mui/material";
import React from "react";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  state = {
    reserveClicked: false,
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

  render() {
    //if reservations in state make <ReservationCard /> jsx
    return (
      <div>
        <h1>Welcome Username</h1>
        <Button
          fullWidth
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
        <h2>Your Upcoming Reservations</h2>
        <ReservationCard date={Date.now()} zone='Yellow' desk='Y7'/>
      </div>
    );
  }
}
