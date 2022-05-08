import "./BookDesk.scss";
import React from "react";
import Button from "@mui/material/Button";
import DateSelect from "../DateSelect/DateSelect";

export default class BookDesk extends React.Component {
  state = {
    floorSelected: "",
    dateSelected: "",
  };

  setFloorSelected = (stringIn) => {
    this.setState({ floorSelected: stringIn });
  };

  setDateSelected = (stringIn) => {
    this.setState({ dateSelected: stringIn });
  };

  
  handleBookDeskDateFloor = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    this.setState({})
}

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
        <DateSelect dateFloorHandler={this.handleBookDeskDateFloor} setFloorSelected={setFloorSelected} setDateSelected={setDateSelected}></DateSelect>
        <Button
          variant="contained"
          onClick={(event) => {
            this.props.nextStage();
          }}
        >
          View Available Desks
        </Button>
      </div>
    );
  }
}
