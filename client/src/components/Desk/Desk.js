import "./Desk.scss";
import React from "react";
import personImage from "../../assets/people/duncan.png";
export default class Desk extends React.Component {
  componentDidMount() {
    console.log(this.props.section);
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
            <div className="desk" key={`${desk.desk}-${index}-${Date.now()}`} onClick={(event) => this.props.deskClick(event, desk)}>
              <div className="desk__location">
                <div
                  className={`${
                    desk.available === "true" ? "desk__person" : "desk__blank"
                  } ${(index + 1) % 2 === 0 ? "--right" : "--left"}`}
                ></div>
                <div
                  className={`desk__desk ${
                    (index + 1) % 2 === 0 ? "--right" : "--left"
                  }`}
                >
                  {desk.desk}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

//this.props.nobooking === "even" && index % 2 === 0 ? ( <div className="desk__location">{value}</div>) :
//(this.props.nobooking === "odd" && index % 2 !== 0 ? <div className="desk__location">{value}</div> : <div className="desk__person">p</div>))
