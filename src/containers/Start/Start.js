import React, { Component } from 'react';
import { Button } from '../Components';
import { VideoContainer } from '../../components/VideoContainer';
import {LeftSpace, RigthSpace, CommonContainer} from '../Common.styled';

class Start extends Component {
  videoManager = {};
  setVideoManager = video => {
    this.videoManager = video;
  };
  handleClick = () => {
    this.props.close(this.videoManager);
  };
  render() {
    const { visible } = this.props;
    return (
      <CommonContainer visible={visible}>
        <LeftSpace>
          <VideoContainer
            getVideoInstance={this.setVideoManager}
            width="640px"
            height="480px"
          />
        </LeftSpace>
        <RigthSpace>
          <div>
            Тут будет какой-то текст про то что нужно посмотреть в камеру и
            нажать на кнопку
          </div>
          <Button onClick={this.handleClick}>ПОИСК</Button>
        </RigthSpace>
      </CommonContainer>
    );
  }
}

export default Start;
