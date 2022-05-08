import "./Desks.scss";
import React from "react";
import Desk from "../Desk/Desk";

export default class Desks extends React.Component {
  tempDesks = [
    {
      desk: "A1-1",
      section: "A",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "A2-1",
      section: "A",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "A3-1",
      section: "A",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "A4-1",
      section: "A",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "A5-1",
      section: "A",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "A6-1",
      section: "A",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "B1-1",
      section: "B",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "B2-1",
      section: "B",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "B3-1",
      section: "B",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "B4-1",
      section: "B",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "B5-1",
      section: "B",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "B6-1",
      section: "B",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "C1-1",
      section: "C",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "C2-1",
      section: "C",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "C3-1",
      section: "C",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "C4-1",
      section: "C",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "C5-1",
      section: "C",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "C6-1",
      section: "C",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "D1-1",
      section: "D",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "D2-1",
      section: "D",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "D3-1",
      section: "D",
      floor: "1",
      zone: "social",
      available: "false",
    },
    {
      desk: "D4-1",
      section: "D",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "D5-1",
      section: "D",
      floor: "1",
      zone: "social",
      available: "true",
    },
    {
      desk: "D6-1",
      section: "D",
      floor: "1",
      zone: "social",
      available: "false",
    },
  ];

  getSections = () => {
    const sectionList = [
      ...new Set(
        this.tempDesks.map((desks) => {
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
        {this.getSections().map((section, index) => {
          return <Desk
            deskClick={this.props.deskClick}
            className="deskscontainer__desklayout"
            key={`${section}-${index}`}
            section={this.tempDesks.filter((desk) => desk.section === section)}
          />;
        })}
      </div>
    );
  }
}
