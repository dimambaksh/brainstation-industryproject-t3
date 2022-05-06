import "./Desk.scss";
import React from "react";

export default class Desk extends React.Component {
  render() {
    return (
      <div
        className={`${
          this.props.className ? `${this.props.className} ` : ""
        }deskcontainer`}
      >
        {this.props.desks.map((value, index) => {
          return (
            <div className="desk" key={`${value}-${index}-${Date.now()}`}>
                {value}
                {this.props.nobooking[`${value}`] }
              {this.props.nobooking[`${value}`] !== undefined ? (
                <div className="desk__location">{value}</div>
              ) : (
                <div className="desk__person">p</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

//this.props.nobooking === "even" && index % 2 === 0 ? ( <div className="desk__location">{value}</div>) :
//(this.props.nobooking === "odd" && index % 2 !== 0 ? <div className="desk__location">{value}</div> : <div className="desk__person">p</div>))
