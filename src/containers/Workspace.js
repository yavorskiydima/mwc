import React, { Component } from 'react';

import { Container } from './Components';
import Start from './Start/Start';
import { RestApi } from '../services/rest-service';
import Result from './Result/Result';
import LoadingSlider from './LoadingSlider/LoadingSlider';
import Settings from './Settings/Settings';
import data from '../test/list';
import { TopCenter, Title } from './Common.styled';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPhoto } from '../actions';

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
    selectedDevices: 0,
    statusSlider: false,
    facePosition: {
      left_angle: [],
      height: 0,
      width: 0,
    },
  };
  videoInstance;
  photoInBase64 = '';
  constructor(props) {
    super(props);
    this.api = new RestApi();
  }
  handleSettingsClick = async e => {
    const { settings, selectedDevices } = this.state;
    if (!settings) {
      const devices = await this.videoInstance.getVideoDevices();
      const currentDeiviceId = devices[0].deviceId;

      return this.setState({
        devices,
        settings: true,
        selectedDevices:
          selectedDevices == 0 ? currentDeiviceId : selectedDevices,
      });
    }
    this.setState({ settings: false });
  };
  handeleChangeDeviceId = e => {
    const { selectedDevices } = this.state;
    const selectedId = e.target.value;

    if (selectedDevices !== selectedId) {
      this.videoInstance.setDeviceId(selectedId);
      this.setState({ selectedDevices: selectedId, settings: false });
    }
  };

  openLoader = async video => {
    if (!this.state.statusSlider) {
      // в video приходит экземпляр класса VideoService
      if (!video.error) {
        this.setState({ statusSlider: true });
        // получение фотографии
        const photo = await video.getPhoto();
        this.photoInBase64 = photo;
        const result = await this.api.sendPhoto(photo);
        console.log({ result });
        const uniqPosition = this.state.pos.findIndex(
          i => i.key === result.uniq_key,
        );

        const responseId = uniqPosition !== -1 ? uniqPosition : 40;
        this.setState({
          responseId,
          facePosition:
            result.result !== 'failure'
              ? {
                  left_angle: result.left_angle,
                  width: result.width,
                  height: result.height,
                }
              : null,
        });

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
          if (displayResult && this.state.responseId !== null) {
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
    } else console.log('Двойное нажатие кнопки');
  };

  speedLoader = () => {
    const { nextFrontPos, responseId, pos } = this.state;

    const step =
      responseId > nextFrontPos
        ? responseId - nextFrontPos
        : pos.length - nextFrontPos + responseId;

    const delay = step > 20 ? 5000 / step : 3000 / step;
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
      statusSlider: false,
    });
  };
  openResult = () => {
    this.setState({ openLoader: false, openResult: true, intervalId: null });
  };
  getVideoInstance = video => {
    this.videoInstance = video;
    const firstDevice = this.videoInstance.getFirstVideoDevice();
    this.setState({
      selectedDevices: firstDevice,
    });
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
      selectedDevices,
      facePosition,
    } = this.state;

    return (
      <Container>
        <TopCenter>
          <Title align="center">
            <span>D</span>eep <span>N</span>eural <span>A</span>nalytics test
          </Title>
        </TopCenter>
        <Settings
          open={settings}
          devices={devices}
          onClose={this.handleSettingsClick}
          value={selectedDevices}
          changeDeviceId={this.handeleChangeDeviceId}
        />
        <Start
          visible={openMenu}
          close={this.openLoader}
          getVideoInstance={this.getVideoInstance}
        />
        <LoadingSlider
          pos={this.state.pos}
          visible={openLoader}
          delay={delay}
        />
        <Result
          currentPhoto={this.photoInBase64}
          visible={openResult}
          close={this.openMenu}
          data={data[responseId]}
          facePosition={facePosition}
        />
      </Container>
    );
  }
}

export default connect(
  state => {},
  dispatch =>
    bindActionCreators(
      {
        addPhoto,
      },
      dispatch,
    ),
)(Workspace);
