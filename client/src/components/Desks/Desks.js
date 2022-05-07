import "./Desks.scss";
import React from "react";
import Desk from "../Desk/Desk"

export default class Desks extends React.Component {
  render() {
    return (
      <div className="deskscontainer">
            <Desk className="deskscontainer__desk" desks={["1", "2", "3", "4","5","6"]} nobooking={["1","4","3", "5"]}/>
      </div>
    );
  }
}
