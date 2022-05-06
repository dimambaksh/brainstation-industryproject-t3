import { Button } from "@mui/material";
import BrowserRouter, { Link } from "react-router-dom";
import React from "react";

export default class Home extends React.Component {
  
    componentDidUpdate() {
        //logic to prevent infinite axios hits
        //axios get reservations
        //save reservations to state
    }
  
    render() {
        //if reservations in state make <ReservationCard /> jsx

    return (
      <>
        <h1>Welcome Username</h1>
        <Link to="/reserve">
          <Button  variant="contained">Book a desk</Button>{/* href="/reserve" */}
        </Link>

        <h2>Your Upcoming Reservations</h2>
        <p>reservations jsx goes here...</p>
      </>
    );
  }
}
