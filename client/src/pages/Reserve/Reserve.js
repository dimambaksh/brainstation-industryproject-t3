import React from "react";
import { AvailableDesks, BookConfirmation, BookDesk } from "../../components";

export default class Reserve extends React.Component {
  state = {
    stage: 1,
  };

  setStage = (intIn) => {
    this.setState({ stage: intIn });
  };

  nextStage = () => {
    let currentStage = this.state.stage;
    currentStage >= 3 ? (currentStage = 1) : currentStage++;

    this.setState({ stage: currentStage });
  };

  reserveStageJSX = () => {
    switch (this.state.stage) {
      case 1:
        return <BookDesk nextStage={this.nextStage}></BookDesk>;
      case 2:
        return <AvailableDesks nextStage={this.nextStage}></AvailableDesks>;
      case 3:
        return <BookConfirmation nextStage={this.nextStage}></BookConfirmation>;
      default:
        return <BookDesk nextStage={this.nextStage}></BookDesk>;
    }
  };

  render() {
    return <div className="reservecontainer">{this.reserveStageJSX()}</div>;
  }
}
