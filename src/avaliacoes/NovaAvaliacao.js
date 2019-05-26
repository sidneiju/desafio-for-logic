import React from "react";
import { Form, Button, message, Spin, DatePicker, Table, Icon } from "antd";
import TagCategoria from "../componentes/TagCategoria";
import { Redirect } from "react-router";
import Cartao from "../componentes/Cartao";
import Api from "../api/Api";
import locale from "antd/lib/date-picker/locale/pt_BR";
import moment from "moment";
import "moment/locale/pt-br";
import "../clientes/NovoEditar.css";
import AvaliacaoForm from "./AvaliacaoForm";
moment.locale("pt-br");

const { MonthPicker } = DatePicker;

class NovaAvaliacao extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avaliacao: {},
      clientes: [],
      selectedRowKeys: [],
      selectedRow: [],
      dataSelected: moment().format(),
      redirect: false,
      loading: false,
      etapa: 1
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
  }

  salvarAvaliacao(avaliacao) {
    Api.url = "http://desafio4devs.forlogic.net/api/evaluations/";
    Api.salvar(avaliacao, this.cb_ok, this.cb_erro);
  }

  alterarCliente(id, cliente) {
    Api.url = "http://desafio4devs.forlogic.net/api/customers/";
    Api.alterar(
      id,
      cliente,
      () => {
        console.log("Cliente atualizado");
      },
      erro => {
        console.log(erro);
      }
    );
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

  clientesMax = () => {
    return Math.ceil(this.state.clientes.length * 0.2);
  };

  desativarCliente = cliente => {
    const { dataSelected } = this.state;
    if (cliente.ultimaAvaliacao === "") {
      return false;
    }
    let ultimaMais2 = moment(cliente.ultimaAvaliacao, "MM/YYYY")
      .add(2, "month")
      .format("MM/YYYY");
    return moment(ultimaMais2, "MM/YYYY").isSameOrAfter(dataSelected);
  };

  onSelectChange = (selectedRowKeys, selectedRow) => {
    if (selectedRowKeys.length > this.clientesMax()) {
      message.destroy();
      message.warning("Limite máximo de Clientes atingido.");
    } else {
      this.setState({ selectedRowKeys, selectedRow });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { selectedRowKeys, selectedRow } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (selectedRowKeys.length === this.clientesMax()) {
          this.setState({
            avaliacao: {
              clientes: selectedRow,
              data: values.data.format("MM/YYYY"),
              resultado: 0
            },
            etapa: 2
          });
        } else {
          message.destroy();
          message.error(
            "É necessário selecionar 20% dos clientes cadastrados."
          );
        }
      } else {
        message.destroy();
        message.error("Mês e Ano de referência não selecionado.");
      }
    });
  };

  render() {
    const { etapa } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/avaliacoes" />;
    }
    if (etapa === 1) {
      return (
        <div className="Content">
          <Cartao
            className="Card1"
            title="Cadastro de Avaliação"
            body={this.renderBodyEtapa1()}
            footer={this.renderFooterEtapa1()}
          />
        </div>
      );
    } else {
      return (
        <div className="Content">
          <Cartao
            className="Card1"
            title="Avaliação em Andamento"
            body={this.renderBodyEtapa2()}
            footer={this.renderFooterEtapa2()}
          />
        </div>
      );
    }
  }

  renderBodyEtapa1() {
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
                  onChange={value =>
                    this.setState({
                      dataSelected: value,
                      selectedRow: [],
                      selectedRowKeys: []
                    })
                  }
                />
              )}
            </Form.Item>
          </Form>
          <span>
            <span style={{ color: "red" }}>* </span>Selecione os clientes que
            participaram da entrevista (20% do total cadastrado):
          </span>
          {this.renderTableEtapa1()}
        </Spin>
      </div>
    );
  }

  renderTableEtapa1() {
    const { selectedRowKeys, clientes, loading } = this.state;
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
        title: "CATEGORIA",
        dataIndex: "categoria",
        width: "20%",
        render: categoria => <TagCategoria categoria={categoria} />
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

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRow) =>
        this.onSelectChange(selectedRowKeys, selectedRow),
      getCheckboxProps: cliente => ({
        disabled: this.desativarCliente(cliente)
      })
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <span>
          Clientes:
          {hasSelected ? ` ${selectedRowKeys.length}/` : " 0/"}
          {this.clientesMax()}
          <Icon type={hasSelected ? "check" : " "} style={{ margin: "2px" }} />
        </span>
        <Table
          rowKey={registro => registro._id}
          columns={columns}
          dataSource={clientes}
          rowSelection={rowSelection}
          pagination={false}
          loading={loading}
          size="small"
          style={{ marginBottom: "8px" }}
        />
      </div>
    );
  }

  renderFooterEtapa1() {
    return (
      <Button
        form="form1"
        type="primary"
        htmlType="submit"
        size="large"
        icon="play-circle"
        disabled={this.state.loading}
      >
        Iniciar
      </Button>
    );
  }

  renderBodyEtapa2() {
    const { avaliacao } = this.state;

    return avaliacao.clientes.map((c, index) => {
      return (
        <AvaliacaoForm
          key={index}
          cliente={c}
          atualizarClienteAvaliacao={clienteNovo =>
            this.atualizarClienteAvaliacao(index, clienteNovo)
          }
        />
      );
    });
  }

  atualizarClienteAvaliacao(index, c) {
    let clientes = this.state.avaliacao.clientes;
    clientes[index] = c;
    let avaliacao = {
      ...this.state.avaliacao,
      clientes: clientes
    };
    this.setState({ avaliacao });
  }

  finalizarAvaliacao = () => {
    const { avaliacao } = this.state;
    if (
      avaliacao.clientes.filter(c => {
        return !c.feito;
      }).length > 0
    ) {
      message.destroy();
      message.error("Preencha todas as avaliações");
    } else {
      avaliacao.clientes.forEach(c => {
        let cliente = {
          nome: c.nome,
          contato: c.contato,
          dataCadastro: c.dataCadastro,
          categoria: c.categoria,
          ultimaAvaliacao: avaliacao.data
        };

        this.alterarCliente(c.id, cliente);
      });

      let total_participantes = avaliacao.clientes.length;
      let promotores = 0;
      let detratores = 0;

      avaliacao.clientes.forEach(c => {
        if (c.categoria >= 9) {
          promotores++;
        } else if (c.categoria <= 6) {
          detratores++;
        }
      });

      let nps = ((promotores - detratores) / total_participantes) * 100;

      avaliacao.resultado = nps;
      this.salvarAvaliacao(avaliacao);
    }
  };

  renderFooterEtapa2() {
    return (
      <Button
        type="primary"
        size="large"
        icon="check"
        onClick={this.finalizarAvaliacao}
        disabled={this.state.loading}
      >
        Finalizar
      </Button>
    );
  }
}

export default Form.create()(NovaAvaliacao);
