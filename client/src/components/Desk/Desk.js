import "./Desk.scss";
import React from "react";

export default class Desk extends React.Component {
  render() {
    return (
      <div className={`${this.props.className?`${this.props.className} `:""}deskcontainer`}>
        {"123456".split("").map((value, index) => {
          return (
            <div className="desk" key={`${value}-${index}-${Date.now()}`}>
              <div className="desk__person">p</div>
              <div className="desk__location">{value}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
