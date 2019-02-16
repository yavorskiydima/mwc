import React, { Component } from "react";

import { Container } from "./Components";
import Start from "./Start/Start";
import Loading from "./Loading/Loading";
import Result from "./Result/Result";

class Workspace extends Component {
  state = {
    openMenu: true,
    openLoader: false,
    openResult: false
  };

  openLoader = () => {
    this.setState({ openMenu: false, openLoader: true });
  };
  openMenu = () => {
    this.setState({ openMenu: true, openResult: false });
  };
  openResult = () => {
    this.setState({ openLoader: false, openResult: true });
  };

  render() {
    const { openMenu, openLoader, openResult } = this.state;
    return (
      <Container>
        {openLoader && (
          <button onClick={this.openResult}>
            Имитиация получения ответа от сервера
          </button>
        )}
        <Start visible={openMenu} close={this.openLoader} />
        <Loading visible={openLoader} />
        <Result visible={openResult} close={this.openMenu} />
      </Container>
    );
  }
}

export default Workspace;
