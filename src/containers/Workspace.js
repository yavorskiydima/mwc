import React, { Component } from "react";

import { Container } from "./Components";
import Start from "./Start/Start";
import Loading from "./Loading/Loading";
import Result from "./Result/Result";
import LoadingSlider from "./LoadingSlider/LoadingSlider";
import obj from "../test/list";

class Workspace extends Component {
  state = {
    openMenu: false,
    openLoader: false,
    openResult: false,
    pos: obj,
    nextLeftPos: 1,
    nextFrontPos: 2,
    nextRightPos: 3
  };

  openLoader = async video => {
    // в video приходит экземпляр класса VideoService
    //const photo = await video.getPhoto();
    //console.log(photo);
    video.stopMediaStream();
    this.setState({ openMenu: false, openLoader: true });
  };
  openMenu = () => {
    this.setState({ openMenu: true, openResult: false });
  };
  openResult = () => {
    this.setState({ openLoader: false, openResult: true });
  };
  change = () => {
    this.interval = setInterval(() => {
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
    }, 200);
  };

  changePos() {
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
  }

  render() {
    const { openMenu, openLoader, openResult } = this.state;
    return (
      <Container>
        {openLoader && (
          <button onClick={this.openResult}>
            Имитиация получения ответа от сервера
          </button>
        )}
        <button onClick={this.change}>Имитиfdfdfdfd</button>
        <LoadingSlider pos={this.state.pos} />
        <Start visible={openMenu} close={this.openLoader} />
        <Loading visible={openLoader} />
        <Result visible={openResult} close={this.openMenu} />
      </Container>
    );
  }
}

export default Workspace;
