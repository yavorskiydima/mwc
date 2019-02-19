import React, { Component } from "react";


import { Container } from "./Components";
import Start from "./Start/Start";
import Loading from "./Loading/Loading";
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
    }, 400);

    this.setState({ openMenu: false, openLoader: true, intervalId: interval });
  };
  openMenu = () => {
    this.setState({ openMenu: true, openResult: false });
  };
  openResult = () => {
    this.setState({ openLoader: false, openResult: true });
  };

  response = () => {
    clearInterval(this.state.intervalId);
    const responseId = Math.floor(Math.random() * this.state.pos.length);
    const currentId = this.state.nextLeftPos;
    const step =
      responseId <= currentId
        ? this.state.pos.length - currentId + responseId
        : responseId - currentId;
    console.log("Совпадение с ", responseId);
    console.log("Текущий ", currentId);
    console.log("Шагов осталось ", step);
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
        <button onClick={this.response}>Как буд-то пришел ответ</button>
        <LoadingSlider pos={this.state.pos} visible={openLoader} />
        <Start visible={openMenu} close={this.openLoader} />
        <Result visible={openResult} close={this.openMenu} />
      </Container>
    );
  }
}

export default Workspace;
