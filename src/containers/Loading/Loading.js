import React, { Component } from "react";
import { Container } from "./Loading.styled";
import logo from "../../logo.png";

class Loading extends Component {
  render() {
    const { visible } = this.props;
    return (
      <Container visible={visible}>
        <img src={logo} alt="EW" />
      </Container>
    );
  }
}

export default Loading;
