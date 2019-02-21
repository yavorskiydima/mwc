import React, { Component } from 'react';

import { Container } from './Components';
import Start from './Start/Start';
import { RestApi } from '../services/rest-service';
import Result from './Result/Result';
import LoadingSlider from './LoadingSlider/LoadingSlider';
import Settings from './Settings/Settings';
import data from '../test/list';

class Workspace extends Component {
  state = {
    openMenu: true,
    openLoader: false,
    openResult: false,
    pos: data.map((item, index) => {
      const position =
        index === 0
          ? 'left'
          : index === 1
          ? 'front'
          : index === 2
          ? 'right'
          : 'back';
      return {
        ...item,
        position: position,
      };
    }),
    nextLeftPos: 1,
    nextFrontPos: 2,
    nextRightPos: 3,
    intervalId: null,
    responseId: null,
    delay: 700,
    settings: false,
    devices: [],
  };
  videoInstance;
  constructor(props) {
    super(props);
    this.api = new RestApi();
  }
  handleSettingsClick = async e => {
    const { settings } = this.state;
    if (!settings) {
      const devices = await this.videoInstance.getVideoDevices();

      return this.setState({
        devices,
        settings: true,
      });
    }
    this.setState({ settings: false });
  };

  openLoader = async video => {
    // в video приходит экземпляр класса VideoService
    if (!video.error) {
      const photo = await video.getPhoto();
      const result = await this.api.sendPhoto(photo);
      console.log(result);
      const uniqPosition = this.state.pos.findIndex(
        i => i.key === result.uniq_key,
      );
      console.log({ uniqPosition });
      result && result.uniq_key && this.setState({ responseId: uniqPosition });

      let displayResult = false;

      const interval = setInterval(() => {
        this.setState(state => ({
          pos: state.pos.map((item, index) => {
            const position =
              index === state.nextLeftPos
                ? 'left'
                : index === state.nextFrontPos
                ? 'front'
                : index === state.nextRightPos
                ? 'right'
                : 'back';
            return { ...item, position };
          }),
          nextLeftPos: ++state.nextLeftPos % state.pos.length,
          nextFrontPos: ++state.nextFrontPos % state.pos.length,
          nextRightPos: ++state.nextRightPos % state.pos.length,
        }));
        if (displayResult && this.state.responseId) {
          clearInterval(this.state.intervalId);
          this.speedLoader();
        }
      }, this.state.delay);

      setTimeout(() => (displayResult = true), 5000);
      this.setState({
        openMenu: false,
        openLoader: true,
        intervalId: interval,
      });
      return;
    }
    console.log('Видео поток не запущен!!!');
  };

  speedLoader = () => {
    const { nextFrontPos, responseId, pos } = this.state;

    const step =
      responseId > nextFrontPos
        ? responseId - nextFrontPos
        : pos.length - nextFrontPos + responseId;

    const delay = 3000 / step;
    console.log('step:', step);
    console.log('people:', data[responseId].name);

    const interval = setInterval(() => {
      this.setState(state => ({
        pos: state.pos.map((item, index) => {
          const position =
            index === state.nextLeftPos
              ? 'left'
              : index === state.nextFrontPos
              ? 'front'
              : index === state.nextRightPos
              ? 'right'
              : 'back';
          return { ...item, position };
        }),
        nextLeftPos: ++state.nextLeftPos % state.pos.length,
        nextFrontPos: ++state.nextFrontPos % state.pos.length,
        nextRightPos: ++state.nextRightPos % state.pos.length,
      }));
      if (this.state.nextLeftPos === this.state.responseId) {
        clearInterval(this.state.intervalId);
        this.openResult();
      }
    }, delay);

    this.setState({
      intervalId: interval,
      delay: delay,
    });
  };

  openMenu = () => {
    this.setState({
      openMenu: true,
      openResult: false,
      responseId: null,
      delay: 700,
    });
  };
  openResult = () => {
    this.setState({ openLoader: false, openResult: true, intervalId: null });
  };

  render() {
    const {
      openMenu,
      openLoader,
      openResult,
      responseId,
      delay,
      devices,
      settings,
    } = this.state;
    return (
      <Container>
        <Settings
          open={settings}
          devices={devices}
          onClose={this.handleSettingsClick}
        />
        <Start
          visible={openMenu}
          close={this.openLoader}
          getVideoInstance={video => (this.videoInstance = video)}
        />
        <LoadingSlider
          pos={this.state.pos}
          visible={openLoader}
          delay={delay}
        />
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
