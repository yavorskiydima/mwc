import React, { Component } from "react";

import { Container } from "./Components";
import Start from "./Start/Start";
import { RestApi } from "../services/rest-service";
import Result from "./Result/Result";
import LoadingSlider from "./LoadingSlider/LoadingSlider";
import obj from "../test/list";

class Workspace extends Component {
  state = {
    openMenu: true,
    openLoader: false,
    openResult: false,
    pos: obj,
    nextLeftPos: 1,
    nextFrontPos: 2,
    nextRightPos: 3,
    intervalId: null,
    responseId: null
  };
  constructor(props) {
    super(props);
    this.api = new RestApi();
  }
  openLoader = async video => {
    // в video приходит экземпляр класса VideoService

    //const photo = await video.getPhoto();
    //console.log(photo);
    video.stopMediaStream();

    const interval = setInterval(() => {
      this.setState(state => ({
        pos: state.pos.map((item, index) => {
          const position =
            index === state.nextLeftPos
              ? "left"
              : index === state.nextFrontPos
              ? "front"
              : index === state.nextRightPos
              ? "right"
              : "back";
          return { ...item, position };
        }),
        nextLeftPos: ++state.nextLeftPos % state.pos.length,
        nextFrontPos: ++state.nextFrontPos % state.pos.length,
        nextRightPos: ++state.nextRightPos % state.pos.length
      }));
      if (this.state.nextLeftPos === this.state.responseId) {
        clearInterval(this.state.intervalId);
        this.openResult();
      }
    }, 700);

    this.setState({ openMenu: false, openLoader: true, intervalId: interval });
  };
  openMenu = () => {
    this.setState({ openMenu: true, openResult: false, responseId: null });
  };
  openResult = () => {
    this.setState({ openLoader: false, openResult: true, intervalId: null });
  };

  response = () => {
    this.setState({
      responseId: Math.floor(Math.random() * this.state.pos.length)
    });
  };

  render() {
    const { openMenu, openLoader, openResult, responseId } = this.state;
    return (
      <Container>
        <button onClick={this.response}>Имитация ответа от бэка</button>
        <Start visible={openMenu} close={this.openLoader} />
        <LoadingSlider pos={this.state.pos} visible={openLoader} />
        <Result
          visible={openResult}
          close={this.openMenu}
          data={obj[responseId]}
        />
      </Container>
    );
  }
}

export default Workspace;
