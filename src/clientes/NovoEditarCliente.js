import React from "react";
import { Form, Input, Button, message, Icon, Spin } from "antd";
import { Redirect } from "react-router";
import Cartao from "../componentes/Cartao";
import Api from "../api/Api";
import "./NovoEditar.css";

class NovoEditarCliente extends React.Component {
  constructor(props) {
    super(props);

    this.editar = props.match.url === "/clientes/novo" ? false : true;
    this.titulo = this.editar ? "Editar Cliente" : "Adicionar Cliente";
    this.textoBotao = this.editar ? "Salvar" : "Inserir";

    this.state = {
      cliente: {},
      redirect: false,
      loading: false
    };

    Api.url = "http://desafio4devs.forlogic.net/api/customers/";
  }

  componentWillMount() {
    if (this.editar) {
      this.setState({ loading: true });
      const { _id } = this.props.match.params;
      Api.buscar(
        _id,
        cliente => {
          this.setState({ loading: false, cliente });
        },
        erro => {
          console.log(erro);
          message.destroy();
          message.error("Erro ao buscar Cliente.");
        }
      );
    }
  }

  salvar(cliente) {
    Api.salvar(cliente, this.cb_ok, this.cb_erro);
  }

  alterar(cliente) {
    const { _id } = this.props.match.params;
    Api.alterar(_id, cliente, this.cb_ok, this.cb_erro);
  }

  cb_ok = data => {
    message.destroy();
    message.success("Salvo!");
    this.setState({
      redirect: true
    });
  };

  cb_erro = erro => {
    console.log(erro);
    message.destroy();
    message.error("Erro ao salvar Cliente.");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let cliente = this.state.cliente;
        cliente.nome = values.nome;
        cliente.contato = values.contato;
        cliente.dataCadastro = values.dataCadastro;

        if (!this.editar) {
          cliente.categoria = -1;
          cliente.ultimaAvaliacao = "";
          this.salvar(cliente);
        } else {
          this.alterar(cliente);
        }
      } else {
        message.destroy();
        message.error("Erro ao salvar Cliente");
      }
    });
  };

  render() {
    const { cliente } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/clientes" />;
    }
    if (this.editar && !cliente) {
      return (
        <div className="Content">
          <Cartao
            className="Card1"
            title={this.titulo}
            body={this.renderBodyNF()}
          />
        </div>
      );
    }
    return (
      <div className="Content">
        <Cartao
          className="Card1"
          title={this.titulo}
          body={this.renderBody()}
          footer={this.renderFooter()}
        />
      </div>
    );
  }

  renderBodyNF() {
    return (
      <div>
        <span>Cliente não encontrado.</span>
        <Button
          type="link"
          onClick={() => {
            this.setState({ redirect: true });
          }}
          block
        >
          Voltar
        </Button>
      </div>
    );
  }

  renderBody() {
    const { getFieldDecorator } = this.props.form;
    const { cliente } = this.state;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 }
    };

    return (
      <div className="NovoEditarForm">
        <Spin spinning={this.state.loading}>
          <Form
            id="form1"
            onSubmit={e => this.handleSubmit(e)}
            layout="horizontal"
          >
            <Form.Item
              {...formItemLayout}
              label="Nome"
              style={{ marginBottom: "0px" }}
            >
              {getFieldDecorator("nome", {
                initialValue: cliente.nome,
                rules: [
                  {
                    required: true,
                    message: "Insira um nome para o Cliente.",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Razão Social ou Nome Fantasia"
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Contato"
              style={{ marginBottom: "0px" }}
            >
              {getFieldDecorator("contato", {
                initialValue: cliente.contato,
                rules: [
                  {
                    required: true,
                    message: "Insira um nome para contato.",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Pessoa responsável para contato"
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Data de Ingresso">
              {getFieldDecorator("dataCadastro", {
                initialValue: cliente.dataCadastro,
                rules: [
                  {
                    required: true,
                    message: "Insira uma data de ingresso.",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="calendar"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Data em que se tornou Cliente"
                />
              )}
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }

  renderFooter() {
    return (
      <Button
        form="form1"
        type="primary"
        htmlType="submit"
        size="large"
        icon="check"
        disabled={this.state.loading}
      >
        {this.textoBotao}
      </Button>
    );
  }
}

export default Form.create()(NovoEditarCliente);
