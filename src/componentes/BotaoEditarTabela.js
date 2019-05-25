import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import "./BotaoEditarTabela.css"

const BotaoEditarTabela = (props) => {
  return (
    <NavLink
      to={props.to}
    >
      <div>
      <Icon className="icon" type={props.icon} />
        <span>{props.nome}</span>
      </div>
    </NavLink>
  );
};

export default BotaoEditarTabela;
