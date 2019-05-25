import React from "react";
import { Form, Button, message, Spin, DatePicker, Table, Select } from "antd";
import { Redirect } from "react-router";
import Cartao from "../componentes/Cartao";
import Api from "../api/Api";
import locale from "antd/lib/date-picker/locale/pt_BR";
import "../clientes/NovoEditar.css";

const { MonthPicker } = DatePicker;

class NovaAvaliacao extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avaliacao: {},
      clientes: [],
      selectedItems: [],
      redirect: false,
      loading: false
    };

    Api.url = "http://desafio4devs.forlogic.net/api/evaluations/";
  }

  componentDidMount() {
    Api.url = "http://desafio4devs.forlogic.net/api/customers/";
    Api.buscarTodos(
      data => {
        let result = Object.keys(data).map(_id => ({ _id, ...data[_id] }));
        this.setState({ clientes: result });
      },
      erro => {
        message.destroy();
        message.error("Erro ao buscar Clientes");
      }
    );
    Api.url = "http://desafio4devs.forlogic.net/api/evaluations/";
  }

  salvar(avaliacao) {
    Api.salvar(avaliacao, this.cb_ok, this.cb_erro);
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
    message.error("Erro ao salvar Avaliação.");
  };

  handleSelectChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/avaliacoes" />;
    }
    return (
      <div className="Content">
        <Cartao
          className="Card1"
          title="Cadastro de Avaliação"
          body={this.renderBody()}
          footer={this.renderFooter()}
        />
      </div>
    );
  }

  renderBody() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="NovoEditarForm">
        <Spin spinning={this.state.loading}>
          <Form id="form1" onSubmit={e => this.handleSubmit(e)} layout="inline">
            <Form.Item label="Referente a" style={{ marginBottom: "8px" }}>
              {getFieldDecorator("data", {
                rules: [
                  {
                    required: true,
                    message: "Insira um mês e ano referente."
                  }
                ]
              })(
                <MonthPicker
                  format="MM/YYYY"
                  locale={locale}
                  placeholder="Selecione o mês"
                />
              )}
            </Form.Item>
          </Form>
          {this.renderTable()}
          {this.renderSelect()}
        </Spin>
      </div>
    );
  }

  renderTable() {
    const columns = [
      {
        title: "NOME",
        dataIndex: "nome",
        width: "30%"
      },
      {
        title: "CONTATO",
        dataIndex: "contato",
        width: "30%"
      },
      {
        title: "DATA CADASTRO",
        dataIndex: "dataCadastro",
        width: "10%"
      },
      {
        title: "ÚLTIMA AVALIAÇÃO",
        dataIndex: "ultimaAvaliacao",
        width: "10%"
      }
    ];
    return (
      <Table
        rowKey={registro => registro._id}
        columns={columns}
        dataSource={this.state.selectedItems}
        pagination={false}
        loading={this.state.loading}
        size="small"
        style={{ marginBottom: "8px" }}
      />
    );
  }

  renderSelect() {
    const { selectedItems, clientes } = this.state;
    const filteredOptions = clientes.filter(o => !selectedItems.includes(o));
    return (
      <Select
        mode="multiple"
        placeholder="Digite o nome do Cliente"
        value={selectedItems}
        onChange={this.handleSelectChange}
        style={{ width: "100%" }}
      >
        {filteredOptions.map(item => (
          <Select.Option key={item._id} value={item.nome}>
            {item.nome}
          </Select.Option>
        ))}
      </Select>
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
        Salvar
      </Button>
    );
  }
}

export default Form.create()(NovaAvaliacao);
