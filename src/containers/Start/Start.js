import React, { Component } from 'react';
import { Wrapper, Camera, Info } from './Start.styled';
import { Button } from '../Components';
import { VideoContainer } from '../../components/VideoContainer';

import web from '../../test/kenny.jpg';

class Start extends Component {
  videoManager = {};
  setVideoManager = video => {
    this.videoManager = video;
  };
  handleClick = () => {
    this.props.close(this.videoManager);
  };
  render() {
    const { visible, close } = this.props;
    return (
      <Wrapper visible={visible}>
        <Camera>
          <VideoContainer
            getVideoInstance={this.setVideoManager}
            width="640px"
            height="480px"
          />
        </Camera>
        <Info>
          <div>
            Тут будет какой-то текст про то что нужно посмотреть в камеру и
            нажать на кнопку
          </div>
          <Button onClick={this.handleClick}>ПОИСК</Button>
        </Info>
      </Wrapper>
    );
  }
}

export default Start;
