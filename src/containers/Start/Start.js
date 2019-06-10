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
import {
  runAutoPlay,
  toggleSnapshotStatus,
  toggleViewResultStatus,
} from '../../actions';
import { runAutoPlayHelper, minutesToMilliseconds } from '../../common.helpers';
import Timer from '../../components/Timer';

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
    const {
      visible,
      isAutoPlay,
      snapshotDelay,
      toggleSnapshotStatus,
      isRunSnapshot,
    } = this.props;
    const { onSuccess } = this;
    const delay = minutesToMilliseconds(snapshotDelay);

    runAutoPlayHelper(onSuccess, {
      visible,
      holdRun: isRunSnapshot,
      delay,
      isAutoSnapShot: isAutoPlay,
      changeStatus: toggleSnapshotStatus,
    });
  }
  render() {
    const { visible, isAutoPlay, snapshotDelay } = this.props;
    const delay = minutesToMilliseconds(snapshotDelay);
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
          {isAutoPlay && <Timer time={delay} />}
        </RigthSpace>
      </CommonContainer>
    );
  }
}

export default connect(
  state => ({
    isAutoPlay: state.autoplay.isAutoPlay,
    snapshotDelay: state.delaySettings.snapshotDelay,
    isRunSnapshot: state.runStatus.isRunSnapshot,
  }),
  dispatch =>
    bindActionCreators(
      {
        runAutoplay: runAutoPlay,
        toggleSnapshotStatus,
        toggleViewResultStatus,
      },
      dispatch,
    ),
)(Start);
