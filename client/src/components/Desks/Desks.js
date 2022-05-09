import "./Desks.scss";
import React from "react";
import Desk from "../Desk/Desk";

export default class Desks extends React.Component {
  state = {
    loaded: false,
    sections: [],
  };

  componentDidMount() {
    console.log("Desks Mounted.");
    console.log(this.props);
    this.setState({ sections: this.getSections() }, () => {
      this.setState({ loaded: true });
    });
    console.log("Desks Mounted complete.");
  }

  getSections = () => {
    const sectionList = [
      ...new Set(
        this.props.desksAvailable.map((desks) => {
          return desks.section;
        })
      ),
    ];
    console.log(sectionList);
    return sectionList;
  };

  render() {
    return (
      <div className="deskscontainer">
        {this.state.loaded
          ? this.state.sections.map((section, index) => {
              return (
                <Desk
                  deskClick={this.props.deskClick}
                  deskSelected={this.props.deskSelected}
                  className="deskscontainer__desklayout"
                  key={`${section}-${index}-${Date.now()}`}
                  reservations={this.props.reservationsList}
                  section={this.props.desksAvailable.filter(
                    (desk) => desk.section === section
                  )}
                />
              );
            })
          : ""}
      </div>
    );
  }
}
