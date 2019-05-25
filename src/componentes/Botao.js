import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import "./Botao.css";

const Botao = props => {
  return (
    <NavLink to={props.to}>
      <Button type={props.type} size={props.size} icon={props.icon}>
        {props.children}
      </Button>
    </NavLink>
  );
};

export default Botao;
