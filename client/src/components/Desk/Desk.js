import "./Desk.scss";
import React from "react";
import personImage from "../../assets/people/duncan.png"
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
              {this.props.nobooking.indexOf(value) >= 0 ? (
                <div className="desk__location">
                  <div className="desk__blank"></div>
                  <div className={`desk__desk ${(index + 1) % 2 === 0? "--right":"--left"}`}></div>
                </div>
              ) : (
                <div className="desk__location">
                  <div className={`desk__person ${(index + 1) % 2 === 0? "--right":"--left"}`}><img src={personImage}/></div>
                  <div className={`desk__desk ${(index + 1) % 2 === 0? "--right":"--left"}`}></div>
                </div>
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
