import React, { Component } from 'react';
import { VideoContainer } from '../../components/VideoContainer';
import {
  LeftSpace,
  RigthSpace,
  CommonContainer,
  Title,
} from '../Common.styled';
import StyledButton from '../../components/Button';
import { CREATING_PHOTO_DELAY, IS_AUTO_SNAPSHOT } from '../../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { runAutoPlay, stopAutoPlay } from '../../actions';

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
    if (IS_AUTO_SNAPSHOT && visible && !this.photoPending) {
      setTimeout(() => {
        onSuccess();
        this.photoPending = true;
      }, CREATING_PHOTO_DELAY);
      return;
    }
  }
  render() {
    const { visible, runAutoplay, isAutoPlay } = this.props;
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
            onClick={runAutoplay}
            text="create photo"
            success={isSuccess}
          />
        </RigthSpace>
      </CommonContainer>
    );
  }
}

export default connect(
  state => ({
    isAutoPlay: state.autoplay.isAutoPlay,
  }),
  dispatch =>
    bindActionCreators(
      {
        runAutoplay: runAutoPlay,
      },
      dispatch,
    ),
)(Start);
