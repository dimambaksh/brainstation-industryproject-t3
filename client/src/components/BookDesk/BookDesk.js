import "./BookDesk.scss";
import React from "react";
import Button from "@mui/material/Button";
import DateSelect from "../DateSelect/DateSelect";
import axios from "axios";

export default class BookDesk extends React.Component {
  state = {
    floorSelected: "social",
    dateSelected: "",
  };

  componentDidMount(){
      this.setDateSelected(this.getFormattedDate());
  }


  getFormattedDate = () =>{
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    let todayFormatted = dd + '/' + mm + '/' + yyyy;
    
    return todayFormatted;
  }

  setFloorSelected = (stringIn) => {
    this.setState({ floorSelected: stringIn });
  };

  setDateSelected = (stringIn) => {
    this.setState({ dateSelected: stringIn });
  };

  handleBookDeskDateFloor = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.dateSelected && this.state.floorSelected){
        this.getDesksAvailable();
    }
  };

  getDesksAvailable = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/reserve`,
      data: {
        date: this.state.dateSelected,
        floor: this.state.floorSelected,
      },
    })
      .then((response) => {
        console.log(response);
        this.props.setAvailableDesks(response.data);
        this.props.nextStage();
      })
      .catch((error) => {
        console.error(error);
        alert(`Server Response: ${error.response.data}`);
      });
  };

  render() {
    return (
      <div className="bookdeskcontainer">
        <h1>Book a Desk</h1>
        <DateSelect
          dateFloorHandler={this.handleBookDeskDateFloor}
          floorSelected={this.state.floorSelected}
          setFloorSelected={this.setFloorSelected}
          dateSelected={this.state.dateSelected}
          setDateSelected={this.setDateSelected}
        ></DateSelect>
        <Button
          variant="contained"
          onClick={this.handleBookDeskDateFloor}
        >
          View Available Desks
        </Button>
      </div>
    );
  }
}
