import React from "react";
import { AvailableDesks, BookConfirmation, BookDesk } from "../../components";
import axios from "axios";

export default class Reserve extends React.Component {
  state = {
    stage: 1,
    floorSelected: "",
    dateSelected: "",
  };

  setFloorSelected = (stringIn) => {
    this.setState({ floorSelected: stringIn });
  };

  setDateSelected = (stringIn) => {
    this.setState({ dateSelected: stringIn });
  };

  setStage = (intIn) => {
    this.setState({ stage: intIn });
  };

  nextStage = () => {
    let currentStage = this.state.stage;
    currentStage >= 3 ? (currentStage = 1) : currentStage++;

    this.setState({ stage: currentStage });
  };

  handleBookDeskDateFloor = (event) =>{
      event.preventDefault();
      event.stopPropagation();
      this.setState({})
  }

  reserveStageJSX = () => {
    switch (this.state.stage) {
      case 1:
        return <BookDesk nextStage={this.nextStage} dateFloorHandler={this.handleBookDeskDateFloor}></BookDesk>;
      case 2:
        return <AvailableDesks nextStage={this.nextStage}></AvailableDesks>;
      case 3:
        return <BookConfirmation nextStage={this.nextStage}></BookConfirmation>;
      default:
        return <BookDesk nextStage={this.nextStage}></BookDesk>;
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
      })
      .catch((error) => {
        console.error(error);
        alert(`Server Response: ${error.response.data}`);
      });
  };

  render() {
    return <div className="reservecontainer">{this.reserveStageJSX()}</div>;
  }
}
