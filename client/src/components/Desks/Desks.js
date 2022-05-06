import "./Desks.scss";
import React from "react";
import Desk from "../Desk/Desk"

export default class Desks extends React.Component {
  render() {
    return (
      <div class="deskscontainer">
          {("123456").split("").map( (value, index) => {
              return <Desk className="deskscontainer__desk" key={`${value}-${index}-${Date.now()}`}/>
          })}
      </div>
    );
  }
}
