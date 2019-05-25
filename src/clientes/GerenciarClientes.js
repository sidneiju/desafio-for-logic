import React from "react";
import Cartao from "../componentes/Cartao";
import { Table, Icon, Popconfirm, message, Tag } from "antd";
import BotaoEditarTabela from "../componentes/BotaoEditarTabela";
import Botao from "../componentes/Botao";
import ClienteApi from "../api/ClienteApi";
import "./GerenciarClientes.css";

/*
 * Esta classe-componente serve para renderizar a tela que
 * vai cuidar do gerenciamento dos clientes. Aqui será possível
 * visualizar os clientes cadastrados ou adicionar novos clientes
 * bem como apagar ou editar os existentes.
 */
class GerenciarCliente extends React.Component {
  /*
   * O construtor da classe responsável por iniciar o estado (state) deste componente.
   * As suas propriedades (props) serão iniciadas de acordo com o componente pai.
   */
  constructor(props) {
    super(props); // Iniciando as propriedades deste componente com as mesmas do componente pai.

    this.state = {
      data: [], // Dados que serão utilizados para a renderização da tabela
      searchText: "", // Variável de texto para ser usada no campo de busca
      loading: false // Variável que indica se a tabela está sendo carregada com os dados
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    ClienteApi.getAll(this.cb_ok, this.cb_erro);
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
    message.error("Erro ao buscar Clientes.");
  };

  // ==========================================================================================
  // Métodos handle que respondem às ações do usuário.
  // ==========================================================================================

  /*
   * Excluir um Cliente.
   */
  handleDelete = _id => {
    message.loading("Em progresso", 0);
    const data = [...this.state.data];
    ClienteApi.excluir(
      _id,
      () => {
        this.setState(
          {
            data: data.filter(item => item._id !== _id)
          },
          () => {
            message.destroy();
            message.success("Excluído!");
          }
        );
      },
      erro => {
        console.log(erro);
        message.destroy();
        message.error("Erro ao excluir Cliente.");
      }
    );
  };

  // ==========================================================================================
  // Métodos de renderização da parte visual
  // ==========================================================================================

  /*
   * Método de renderização do componente
   * (aqui vai o código que será responsável pela parte visual do sistema)
   */
  render() {
    return (
      <div className="Content">
        <Cartao // Componente Card que possui uma folha de estilo próprio para mostrar conteúdos na tela.
          className="Card1"
          title="Gerenciar Clientes"
          body={this.renderBody()}
          footer={this.renderFooter()}
        />
      </div>
    );
  }

  criarTagCategoria(categoria) {
    let nome = "Nenhum";
    let color = "gold";
    if (categoria >= 0 && categoria <= 6) {
      nome = "Detrator";
      color = "red";
    }else if(categoria >= 7 && categoria <= 8){
      nome = "Neutro";
      color = "blue";
    }else if(categoria >= 9 && categoria <= 10){
      nome = "Promotor";
      color = "green";
    }
    return <Tag color={color}>{nome}</Tag>;
  }

  /*
   * Método responsável por renderizar o corpo (body) do Card.
   * É aqui que a 'tabela de gerenciamento' será renderizada.
   */
  renderBody() {
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
        render: categoria => this.criarTagCategoria(categoria)
      },
      {
        title: "DATA CADASTRO",
        dataIndex: "dataCadastro",
        width: "10%"
      },
      {
        title: "EDITAR",
        align: "center",
        width: "5%",
        render: registro => (
          <BotaoEditarTabela
            to={`${this.props.match.url}/${registro._id}`}
            icon="edit"
          />
        )
      },
      {
        title: "APAGAR",
        align: "center",
        width: "5%",
        render: registro => (
          <Popconfirm
            title="Tem certeza?"
            onConfirm={() => this.handleDelete(registro._id)}
          >
            <Icon type="delete" className="icon" />
          </Popconfirm>
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

  /*
   * Método responsável por renderizar o rodapé (footer) do Card.
   * Aqui o botão de 'cadastrar novos clientes' será renderizado.
   */
  renderFooter() {
    return (
      <Botao to="/clientes/novo" type="primary" size="large" icon="plus">
        Adicionar
      </Botao>
    );
  }
}

export default GerenciarCliente;
