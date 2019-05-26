import React from "react";
import Cartao from "../componentes/Cartao";
import { Table, Tag, Icon, message } from "antd";
import BotaoEditarTabela from "../componentes/BotaoEditarTabela";
import Botao from "../componentes/Botao";
import Api from "../api/Api";
import "./GerenciarAvaliacoes.css";

class GerenciarAvaliacoes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false
    };

    Api.url = "http://desafio4devs.forlogic.net/api/evaluations/";
  }

  componentDidMount() {
    this.setState({ loading: true });
    Api.buscarTodos(this.cb_ok, this.cb_erro);
  }

  cb_ok = data => {
    let result = Object.keys(data).map(_id => ({ _id, ...data[_id] }));
    this.setState({
      loading: false,
      data: result
    });
  };

  cb_erro = erro => {
    this.setState({
      loading: false
    });
    console.log(erro);
    message.destroy();
    message.error("Erro ao buscar Avaliações.");
  };

  render() {
    return (
      <div className="Content">
        <Cartao
          className="Card1"
          title="Avaliações"
          body={this.renderBody()}
          footer={this.renderFooter()}
        />
      </div>
    );
  }

  renderBody() {
    const columns = [
      {
        title: "DATA REFERENTE",
        dataIndex: "data",
        width: "40%",
      },
      {
        title: "RESULTADO",
        dataIndex: "resultado",
        width: "40%",
        render: resultado => this.criarTagResultado(resultado)
      },
      {
        title: "VISUALIZAR",
        align: "center",
        width: "20%",
        render: registro => (
          <BotaoEditarTabela
            to={`${this.props.match.url}/${registro._id}`}
            icon="eye"
          />
        )
      }
    ];
    return (
      <Table
        rowKey={registro => registro._id}
        columns={columns}
        dataSource={this.state.data}
        pagination={false}
        loading={this.state.loading}
        size="small"
      />
    );
  }

  renderFooter() {
    return (
      <Botao to="/avaliacoes/nova" type="primary" size="large" icon="plus">
        Cadastrar Avaliação
      </Botao>
    );
  }

  criarTagResultado(resultado) {
    let nome = "Meta Não Atingida";
    let color = "red";
    let icon = "frown";
    if (resultado >= 80) {
      nome = "Meta Atingida";
      color = "green";
      icon = "smile";
    } else if (resultado >= 60 && resultado <= 79.99) {
      nome = "Meta Tolerada";
      color = "gold";
      icon = "meh";
    }
    return (
      <Tag prefix={<Icon type={icon} />} color={color}>
        {nome}
      </Tag>
    );
  }
}

export default GerenciarAvaliacoes;
