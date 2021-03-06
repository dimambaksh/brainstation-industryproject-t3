import "./BookConfirmation.scss";
import React from "react";
import Button from "@mui/material/Button";
import { ReactComponent as ZoneIcon } from "../../assets/icons/zone.svg";
import { ReactComponent as DeskIcon } from "../../assets/icons/desk.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
import { ReactComponent as FloorIcon } from "../../assets/icons/floor.svg";
import HeaderMenu from "../HeaderMenu/HeaderMenu";

export default class BookConfirmation extends React.Component {
  render() {
    return (
      <div className="bookconfirmationcontainer">
        <HeaderMenu></HeaderMenu>
        <h1 className="centered">Your Desk is Confirmed!</h1>
        <div className="centered">
          <svg
            alt="Checkmark"
            width="232"
            height="232"
            viewBox="0 0 232 232"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M93.8635 109.137C92.0432 107.316 89.5744 106.294 87.0002 106.294C84.4259 106.294 81.9571 107.316 80.1368 109.137C78.3166 110.957 77.2939 113.426 77.2939 116C77.2939 118.574 78.3166 121.043 80.1368 122.863L109.137 151.863C110.04 152.759 111.111 153.468 112.289 153.949C113.467 154.43 114.728 154.674 116 154.667C117.324 154.625 118.624 154.311 119.821 153.746C121.019 153.181 122.087 152.375 122.96 151.38L190.627 74.0467C192.189 72.1068 192.943 69.6388 192.73 67.1571C192.517 64.6754 191.354 62.3716 189.485 60.7261C187.615 59.0806 185.182 58.2204 182.693 58.3248C180.205 58.4293 177.852 59.4903 176.127 61.2867L116 130.887L93.8635 109.137Z"
              fill="#0FA958"
            />
            <path
              d="M203 106.333C200.437 106.333 197.978 107.352 196.165 109.165C194.352 110.977 193.334 113.436 193.334 116C193.334 136.51 185.186 156.18 170.683 170.683C156.181 185.186 136.511 193.333 116 193.333C100.728 193.326 85.7995 188.797 73.0975 180.318C60.3955 171.838 50.4887 159.787 44.6265 145.684C38.7642 131.582 37.2089 116.059 40.1567 101.074C43.1045 86.0883 50.4234 72.3114 61.1905 61.48C68.3506 54.224 76.886 48.4691 86.2973 44.5519C95.7086 40.6346 105.807 38.6339 116 38.6667C122.182 38.7054 128.34 39.4185 134.367 40.7933C135.628 41.1834 136.956 41.3111 138.268 41.1684C139.581 41.0257 140.85 40.6157 141.998 39.9637C143.146 39.3117 144.148 38.4315 144.943 37.3773C145.737 36.3232 146.308 35.1174 146.619 33.8344C146.929 32.5514 146.974 31.2183 146.75 29.9174C146.526 28.6164 146.038 27.3751 145.316 26.27C144.593 25.165 143.652 24.2195 142.551 23.492C141.449 22.7645 140.21 22.2704 138.91 22.04C131.401 20.2733 123.715 19.3653 116 19.3333C96.9024 19.4325 78.2617 25.1867 62.4307 35.8696C46.5997 46.5526 34.2879 61.6855 27.049 79.3588C19.8101 97.0321 17.9685 116.454 21.7566 135.172C25.5447 153.891 34.7928 171.069 48.3338 184.537C66.2818 202.493 90.6124 212.607 116 212.667C141.638 212.667 166.226 202.482 184.354 184.354C202.483 166.225 212.667 141.638 212.667 116C212.667 113.436 211.649 110.977 209.836 109.165C208.023 107.352 205.564 106.333 203 106.333Z"
              fill="#0FA958"
            />
          </svg>
        </div>
        <div className="bookconfirmationcontainer__choice">
        <div className="flex-align">
                <ZoneIcon />{" "}
                <span className="capitalize">
                  {this.props.deskSelected.zone} Zone
                </span>
              </div>
              <div className="flex-align narrow">
                <DeskIcon />{" "}
                <span className="capitalize">
                  {this.props.deskSelected.desk}
                </span>
              </div>
              <div className="flex-align">
                <DateIcon />{" "}
                <span className="capitalize">{this.props.dateSelected}</span>
              </div>
              <div className="flex-align narrow">
                <FloorIcon />{" "}
                <span className="capitalize">
                  {this.props.deskSelected.floor}
                </span>
              </div>
            </div>
        <div className="buttonFlex">
        <Button
          variant="contained"
          href="/"
        >
          Add to Calendar
        </Button>
        <Button
          variant="contained"
          href="/"
        >
          Return to home
        </Button>
        </div>
      </div>
    );
  }
}
