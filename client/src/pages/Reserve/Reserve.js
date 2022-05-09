import React from "react";
import { AvailableDesks, BookConfirmation, BookDesk } from "../../components";

export default class Reserve extends React.Component {
  state = {
    stage: 1,
    desksAvailable: {},
    floorSelected: "social",
    dateSelected: "",
    deskSelected: {},
  };

  componentDidMount() {
    console.log("Reserve");
    this.setDateSelected(this.getFormattedDate());
  }

  getFormattedDate = () => {
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    let todayFormatted = mm + "/" + dd + "/" + yyyy;

    return todayFormatted;
  };

  setDeskSelected = (objectIn) => {
    this.setState({ deskSelected: objectIn });
  };

  setFloorSelected = (stringIn) => {
    this.setState({ floorSelected: stringIn });
  };

  setDateSelected = (stringIn) => {
    console.log("stringIn: " + typeof stringIn + " " + stringIn);

    this.setState({ dateSelected: stringIn });
  };

  setDesksAvailable = (objectIn) => {
    console.log("Desks Available");
    this.setState({ desksAvailable: objectIn }, this.nextStage);
  };

  setStage = (intIn) => {
    this.setState({ stage: intIn });
  };

  nextStage = () => {
    console.log(this.state);

    let currentStage = this.state.stage;
    currentStage >= 3 ? (currentStage = 1) : currentStage++;

    this.setState({ stage: currentStage });
  };

  reserveStageJSX = () => {
    switch (this.state.stage) {
      case 1:
        return (
          <BookDesk
            nextStage={this.nextStage}
            dateSelected={this.state.dateSelected}
            floorSelected={this.state.floorSelected}
            setDateSelected={this.setDateSelected}
            setFloorSelected={this.setFloorSelected}
            setAvailableDesks={this.setDesksAvailable}
          ></BookDesk>
        );
      case 2:
        return (
          <AvailableDesks
            dateSelected={this.state.dateSelected}
            floorSelected={this.state.floorSelected}
            desksAvailable={this.state.desksAvailable}
            deskSelected={this.state.deskSelected}
            setDeskSelected={this.setDeskSelected}
            nextStage={this.nextStage}
          ></AvailableDesks>
        );
      case 3:
        return (
          <BookConfirmation
            history={this.props.history}
            dateSelected={this.state.dateSelected}
            floorSelected={this.state.floorSelected}
            deskSelected={this.state.deskSelected}
            nextStage={this.nextStage}
          ></BookConfirmation>
        );
      default:
        return <BookDesk nextStage={this.nextStage}></BookDesk>;
    }
  };

  render() {
    return <div className="reservecontainer">{this.reserveStageJSX()}</div>;
  }
}
