import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";

class MenuItem extends React.Component {
  render() {
    return (
      <NavLink
        to={this.props.to}
        className="NavLink"
        activeClassName="ActiveLink"
      >
        <div>
          <Icon className="icon" type={this.props.icon}  />
          <span>{this.props.nome}</span>
        </div>
      </NavLink>
    );
  }
}

export default MenuItem;
