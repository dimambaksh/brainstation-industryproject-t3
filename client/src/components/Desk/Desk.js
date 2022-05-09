import "./Desk.scss";
import React from "react";
import axios from "axios";

export default class Desk extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div
        className={`${
          this.props.className ? `${this.props.className} ` : ""
        }deskcontainer`}
      >
        {this.props.section.map((desk, index) => {
          return (
            <div
              className="desk"
              key={`${desk.desk}-${index}-${Date.now()}`}
              onClick={(event) => this.props.deskClick(event, desk)}
            >
              <div className="desk__location">
                <div
                  className={`${
                    desk.available === "true" ? "desk__person" : "desk__blank"
                  } ${(index + 1) % 2 === 0 ? "--right" : "--left"}`}
                >
                  {this.props.reservations[desk.desk] ? (
                    <img
                      src={this.props.reservations[desk.desk]}
                      alt={this.props.reservations[desk.desk]}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={`desk__desk ${
                    desk.available === "true"
                      ? `${
                          this.props.reservations[desk.desk]
                            ? "notavailable"
                            : desk.desk === this.props.deskSelected.desk
                            ? "selected available"
                            : "available"
                        }`
                      : "notavailable"
                  } ${(index + 1) % 2 === 0 ? "--right" : "--left"}`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
