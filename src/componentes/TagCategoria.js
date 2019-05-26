import React from "react";
import { Tag } from "antd";

const TagCategoria = props => {
  let nome = "Nenhum";
  let color = "gold";
  if (props.categoria >= 0 && props.categoria <= 6) {
    nome = "Detrator";
    color = "red";
  } else if (props.categoria >= 7 && props.categoria <= 8) {
    nome = "Neutro";
    color = "blue";
  } else if (props.categoria >= 9 && props.categoria <= 10) {
    nome = "Promotor";
    color = "green";
  }
  return <Tag color={color}>{nome}</Tag>;
};

export default TagCategoria;
