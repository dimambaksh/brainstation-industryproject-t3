import { Button, TextField } from "@mui/material";
import React from "react";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import { Link } from "react-router-dom";
import "./Home.css";

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
      <div className="Home">
        <h1>Your Office: MPI Partners</h1>
        <div className="Home__Building dropShadow"><p>8 Adelaide St W Suite 200, Toronto, ON</p></div>
        <Button
          fullWidth
          size='large'
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
        <ReservationCard date={'May 09, 2022'} zone='Collaborative' desk='Y7' screening='pass'/>
        <ReservationCard date={'May 10, 2022'} zone='Collaborative' desk='Y7' screening='incomplete'/>
        <ReservationCard date={'August 19, 2022'} zone='Collaborative' desk='Y7' screening='future'/>
      </div>
    );
  }
}
