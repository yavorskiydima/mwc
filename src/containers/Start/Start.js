import React, { Component } from "react";
import { Wrapper, Camera, Info } from "./Start.styled";
import { Button } from "../Components";

import web from "../../test/kenny.jpg";

class Start extends Component {
  render() {
    const { visible, close } = this.props;
    return (
      <Wrapper visible={visible}>
        <Camera>
          <img src={web} alt="web" />
        </Camera>
        <Info>
          <div>
            Тут будет какой-то текст про то что нужно посмотреть в камеру и
            нажать на кнопку
          </div>
          <Button onClick={close}>ПОИСК</Button>
        </Info>
      </Wrapper>
    );
  }
}

export default Start;
