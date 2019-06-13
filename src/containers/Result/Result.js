import React, { Component } from 'react';
import { Container, BottomSpace, TopSpace } from './Result.styled';
import { ResultContainer, Title, Img, Canvas } from '../Common.styled';
import {
  runAutoPlayHelper,
  minutesToMilliseconds,
  cutImage,
} from '../../common.helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  toggleViewResultStatusOn,
  toggleSnapshotStatusOff,
} from '../../actions';

class Result extends Component {
  holdShowInfo = true;
  componentDidMount() {
    this.holdShowInfo = false;
    this.canvas = React.createRef();
    this.img = React.createRef();
  }
  componentDidUpdate() {
    const {
      visible,
      close,
      isAutoPlay,
      showResultDelay,
      isRunResultView,
      toggleViewResultStatusOn,
      toggleSnapshotStatusOff,
      currentPhoto,
      facePosition,
    } = this.props;

    runAutoPlayHelper(close, {
      visible,
      holdRun: isRunResultView,
      delay: minutesToMilliseconds(showResultDelay),
      isAutoSnapShot: isAutoPlay,
      changeStatus: () => {
        toggleViewResultStatusOn();
        toggleSnapshotStatusOff();
      },
    });
    if (currentPhoto && facePosition) {
      const { left_angle, height, width } = facePosition;
      cutImage(
        currentPhoto,
        this.canvas.current,
        this.img.current,
        left_angle[0],
        left_angle[1],
        width,
        height,
      );
    }
  }
  render() {
    const { visible, data, currentPhoto, facePosition } = this.props;
    return data && visible ? (
      <Container visible={visible}>
        <TopSpace>
          <Img src={data.pic} ref={this.img} alt="EW" />

          {currentPhoto && facePosition && (
            <Canvas
              style={{
                background: 'tomato',
                transform: 'scaleX(-1)',
              }}
              ref={this.canvas}
            />
          )}
        </TopSpace>
        <BottomSpace>
          <ResultContainer>
            <Title>{data.name}</Title>
            <p>{data.date}</p>
            <p>{data.description}</p>
          </ResultContainer>
        </BottomSpace>
      </Container>
    ) : null;
  }
}

export default connect(
  state => ({
    isAutoPlay: state.autoplay.isAutoPlay,
    showResultDelay: state.delaySettings.showResultDelay,
    isRunResultView: state.runStatus.isRunResultView,
  }),
  dispatch =>
    bindActionCreators(
      {
        toggleSnapshotStatusOff,
        toggleViewResultStatusOn,
      },
      dispatch,
    ),
)(Result);
