import React, { Component } from 'react';
import { VideoContainer } from '../../components/VideoContainer';
import {
  LeftSpace,
  RigthSpace,
  CommonContainer,
  Title,
} from '../Common.styled';
import StyledButton from '../../components/Button';
import { CREATING_PHOTO_DELAY } from '../../constants';

class Start extends Component {
  videoManager = {};
  state = {
    statistic: '',
    isSuccess: false,
  };
  photoPending = true;
  setVideoManager = video => {
    this.videoManager = video;
    const { getVideoInstance } = this.props;

    getVideoInstance(video);
  };
  onSuccess = e => {
    const { isSuccess } = this.state;
    // e.preventDefault();
    setTimeout(() => {
      this.setState({ isSuccess: false });
    }, 4000);
    this.props.close(this.videoManager);
    this.setState({ isSuccess: !isSuccess });
  };
  componentDidMount() {
    this.photoPending = false;
  }
  componentDidUpdate() {
    const { visible } = this.props;
    const { onSuccess } = this;
    this.photoPending = !visible;
    if (visible && !this.photoPending) {
      setTimeout(() => {
        onSuccess();
        this.photoPending = true;
      }, CREATING_PHOTO_DELAY);
      return;
    }
  }
  render() {
    const { visible } = this.props;
    const { isSuccess } = this.state;

    return (
      <CommonContainer visible={visible}>
        <LeftSpace>
          <VideoContainer
            getVideoInstance={this.setVideoManager}
            width="520px"
            height="390px"
          />
        </LeftSpace>
        <RigthSpace>
          <Title>Which celebrity do you look like?</Title>
          <StyledButton
            firstColor="#30d5c8"
            secondColor="#24b3a7"
            invert
            onClick={this.onSuccess}
            text="create photo"
            success={isSuccess}
          />
        </RigthSpace>
      </CommonContainer>
    );
  }
}

export default Start;
