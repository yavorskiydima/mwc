import React, { Component } from "react";
import { Button } from "../Components";
import { Container } from "./Result.styled";
import { LeftSpace, RigthSpace } from "../Common.styled";

class Result extends Component {
  render() {
    const { visible, close, data } = this.props;
    console.log(data);
    return (
      <Container visible={visible}>
        <LeftSpace>{data && <img src={data.pic} alt="EW" />}</LeftSpace>
        <RigthSpace>
          <Button onClick={close}>Закрыть</Button>
        </RigthSpace>
      </Container>
    );
  }
}

export default Result;
