import "./HeaderMenu.scss";
import React from "react";
import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import Button from "@mui/material/Button";

export default class HeaderMenu extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="headermenu">
        <div className="headermenu__left">
          {this.props.hrefLocation ? (
            <Button variant="contained" href={this.props.hrefLocation}>
              <BackIcon />
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className="headermenu__right">
          <Button variant="contained">
            <MenuIcon />
          </Button>
        </div>
      </div>
    );
  }
}
