import React, { Component } from "react";

import { Container } from "./Components";
import Start from "./Start/Start";
import { RestApi } from "../services/rest-service";
import Result from "./Result/Result";
import LoadingSlider from "./LoadingSlider/LoadingSlider";
import data from "../test/list";

class Workspace extends Component {
  state = {
    openMenu: true,
    openLoader: false,
    openResult: false,
    pos: data.map((item, index) => {
      const position =
        index === 0
          ? "left"
          : index === 1
          ? "front"
          : index === 2
          ? "right"
          : "back";
      return {
        ...item,
        position: position
      };
    }),
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

    const photo = await video.getPhoto();
    const result = await this.api.sendPhoto(photo);

    const pos = this.state.pos.findIndex(i => i.name === result.uniq_key);
    result && result.uniq_key && this.setState({ responseId: pos });

    let displayResult = false;

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
      if (displayResult && this.state.nextLeftPos === this.state.responseId) {
        clearInterval(this.state.intervalId);
        this.openResult();
      }
    }, 700);

    setTimeout(() => (displayResult = true), 5000);
    this.setState({ openMenu: false, openLoader: true, intervalId: interval });
  };
  openMenu = () => {
    this.setState({ openMenu: true, openResult: false, responseId: null });
  };
  openResult = () => {
    this.setState({ openLoader: false, openResult: true, intervalId: null });
  };

  render() {
    const { openMenu, openLoader, openResult, responseId } = this.state;
    return (
      <Container>
        <Start visible={openMenu} close={this.openLoader} />
        <LoadingSlider pos={this.state.pos} visible={openLoader} />
        <Result
          visible={openResult}
          close={this.openMenu}
          data={data[responseId]}
        />
      </Container>
    );
  }
}

export default Workspace;
