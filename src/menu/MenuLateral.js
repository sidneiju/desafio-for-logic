import React from "react";
import MenuItem from "./MenuItem";
import logo from "../img/logo.png";
import "./MenuLateral.css";

class MenuLateral extends React.Component {
  render() {
    return (
      <div className="Menu">
        <img
          src={logo}
          alt="logo.png"
          style={{ width: "10vw", height: "12vh", margin: "8px" }}
        />
        <MenuItem to="/clientes" icon="team" nome="Clientes" />
        <MenuItem to="/avaliacoes" icon="area-chart" nome="Avaliações" />
      </div>
    );
  }
}

export default MenuLateral;
