import React, { Component } from "react";
import { Button } from "../Components";
import {LeftSpace, RigthSpace, CommonContainer} from '../Common.styled';

class Result extends Component {
  render() {
    const { visible, close } = this.props;
    return (
      <CommonContainer visible={visible}>
        <LeftSpace>TEST</LeftSpace>
        <RigthSpace><Button onClick={close}>Закрыть</Button></RigthSpace>
      </CommonContainer>
    );
  }
}

export default Result;
