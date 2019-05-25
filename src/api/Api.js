import axios from "axios";

const Api = {

  url: "",
  headers: { Authorization: "safe-solucoes-27cfc" },

  buscarTodos(cb_ok, cb_erro) {
    axios
      .get(this.url, { headers: this.headers })
      .then(response => {
        cb_ok(response.data);
      })
      .catch(error => {
        cb_erro(error);
      });
  },

  buscar(_id, cb_ok, cb_erro) {
    axios
      .get(this.url + _id, { headers: this.headers })
      .then(response => {
        cb_ok(response.data);
      })
      .catch(error => {
        cb_erro(error);
      });
  },

  salvar(objeto, cb_ok, cb_erro) {
    axios
      .post(this.url, objeto, { headers: this.headers })
      .then(response => {
        cb_ok(response.status);
      })
      .catch(error => {
        cb_erro(error);
      });
  },

  alterar(_id, objeto, cb_ok, cb_erro) {
    axios
      .put(this.url + _id, objeto, { headers: this.headers })
      .then(response => {
        cb_ok(response.status);
      })
      .catch(error => {
        cb_erro(error);
      });
  },
  
  excluir(_id, cb_ok, cb_erro) {
    axios
      .delete(this.url + _id, { headers: this.headers })
      .then(response => {
        cb_ok(response.status);
      })
      .catch(error => {
        cb_erro(error);
      });
  }
};

export default Api;
