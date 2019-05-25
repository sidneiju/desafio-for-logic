import React from "react";
import "./Cartao.css";

class Cartao extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="ContentHeader">
          {!this.props.title ? null : (
            <div className="ContentIcon">
              <span className="ContentTitle">{this.props.title}</span>
            </div>
          )}
        </div>
        <div className="ContentBody">{this.props.body}</div>
        <div className="ContentFooter">{this.props.footer}</div>
      </div>
    );
  }
}

export default Cartao;
