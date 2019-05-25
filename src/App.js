import React from "react";
import Cartao from "./componentes/Cartao";
import MenuLateral from "./menu/MenuLateral";
import { Route, Switch } from "react-router-dom";
import GerenciarClientes from "./clientes/GerenciarClientes";
import NovoEditarCliente from "./clientes/NovoEditarCliente";
import GerenciarAvaliacoes from "./avaliacoes/GerenciarAvaliacoes";
import NovaAvaliacao from "./avaliacoes/NovaAvaliacao";
import VisualizarAvaliacao from "./avaliacoes/VisualizarAvaliacao";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Cartao className="CardSideBar" body={this.renderSideBar()} />
        <Switch>
          <Route path="/clientes" exact component={GerenciarClientes} />
          <Route path="/clientes/novo" component={NovoEditarCliente} />
          <Route path="/clientes/:_id" component={NovoEditarCliente} />
          <Route path="/avaliacoes" exact component={GerenciarAvaliacoes} />
          <Route path="/avaliacoes/nova" component={NovaAvaliacao} />
          <Route path="/avaliacoes/:_id" component={VisualizarAvaliacao} />
        </Switch>
      </div>
    );
  }

  renderSideBar() {
    return <MenuLateral />;
  }
}

export default App;
