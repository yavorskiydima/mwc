import React, { Component } from "react";
import { Container } from "./Result.styled";
import { Button } from "../Components";

class Result extends Component {
  render() {
    const { visible, close } = this.props;
    return (
      <Container visible={visible}>
        <div>TEXT</div>
        <Button onClick={close}>Закрыть</Button>
      </Container>
    );
  }
}

export default Result;
