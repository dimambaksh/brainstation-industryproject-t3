import "./BookDesk.scss";
import React from "react";
import Button from "@mui/material/Button";
import DateSelect from "../DateSelect/DateSelect";
import axios from "axios";

export default class BookDesk extends React.Component {

  handleBookDeskDateFloor = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.dateSelected && this.props.floorSelected){
        this.getDesksAvailable();
    }
  };

  getDesksAvailable = () => {
    axios({
      method: "post",
      url: `http://${process.env.REACT_APP_API_URL}:8080/reserve/${this.props.floorSelected === "social"?"1":"2"}`,
      data: {
        date: this.props.dateSelected,
      },
    })
      .then((response) => {
        console.log(response);
        this.props.setAvailableDesks(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert(`Server Response: ${error.response.data}`);
      });
  };

  render() {
    return (
      <div className="bookdeskcontainer">
        <h1 className="centered">Book a Desk</h1>
        <DateSelect
          dateFloorHandler={this.handleBookDeskDateFloor}
          floorSelected={this.props.floorSelected}
          setFloorSelected={this.props.setFloorSelected}
          dateSelected={this.props.dateSelected}
          setDateSelected={this.props.setDateSelected}
        ></DateSelect>
        <div className="buttonholder"><Button
          fullWidth
          variant="contained"
          onClick={this.handleBookDeskDateFloor}
        >
          View Available Desks
        </Button>
        </div>
      </div>
    );
  }
}
