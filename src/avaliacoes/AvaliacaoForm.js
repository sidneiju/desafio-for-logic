import React from "react";
import { Form, Rate, Input, Typography, Button, message, Icon } from "antd";

class AvaliacaoForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { cliente } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        cliente.feito = true;
        cliente.categoria = values.categoria;
        cliente.motivo = values.motivo;
        this.props.atualizarClienteAvaliacao(cliente);
        message.destroy();
        message.success("Salvo.");
      } else {
        message.destroy();
        message.error("Erro ao salvar avaliação.");
      }
    });
  };

  render() {
    const { cliente } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={e => this.handleSubmit(e)} layout="horizontal">
          <Typography.Title level={4}>{cliente.nome + " "}<Icon type={cliente.feito ? "check" : " "}></Icon></Typography.Title>
          <Form.Item
            label="Em uma escala de 0 a 10, qual a probabilidade de você recomendar nosso produto/serviço a um amigo/conhecido?"
            style={{ marginBottom: "8px" }}
            colon={false}
          >
            {getFieldDecorator("categoria", {
              rules: [
                {
                  required: false,
                  message: "Preencha essa informação."
                }
              ]
            })(<Rate count={10} />)}
          </Form.Item>
          <Form.Item
            label="Qual é o motivo dessa nota?"
            style={{ marginBottom: "8px" }}
            colon={false}
          >
            {getFieldDecorator("motivo", {
              rules: [
                {
                  required: true,
                  message: "Escreva o motivo da nota."
                }
              ]
            })(<Input.TextArea />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(AvaliacaoForm);
