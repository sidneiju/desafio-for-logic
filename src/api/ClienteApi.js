import axios from "axios";

const url = "http://desafio4devs.forlogic.net/api/customers/";
const headers = {
  Authorization: "safe-solucoes-27cfc"
};

class ClienteApi {
  static getAll(cb_ok, cb_erro) {
    axios
      .get(url, { headers })
      .then(response => {
        cb_ok(response.data);
      })
      .catch(error => {
        cb_erro(error);
      });
  }

  static get(_id, cb_ok, cb_erro) {
    axios
      .get(url + _id, { headers })
      .then(response => {
        cb_ok(response.data);
      })
      .catch(error => {
        cb_erro(error);
      });
  }

  static salvar(cliente, cb_ok, cb_erro) {
    axios
      .post(url, cliente, { headers })
      .then(response => {
        cb_ok(response.status);
      })
      .catch(error => {
        cb_erro(error);
      });
  }

  static alterar(_id, cliente, cb_ok, cb_erro) {
    axios
      .put(url + _id, cliente, { headers })
      .then(response => {
        cb_ok(response.status);
      })
      .catch(error => {
        cb_erro(error);
      });
  }

  static excluir(_id, cb_ok, cb_erro) {
    axios
      .delete(url + _id, { headers })
      .then(response => {
        cb_ok(response.status);
      })
      .catch(error => {
        cb_erro(error);
      });
  }
}

export default ClienteApi;
