import React, { Component } from 'react';
import { Container, BottomSpace, TopSpace } from './Result.styled';
import { ResultContainer, Title, Img } from '../Common.styled';
import {
  runAutoPlayHelper,
  minutesToMilliseconds,
  cutImage,
} from '../../common.helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleViewResultStatus, toggleSnapshotStatus } from '../../actions';

class Result extends Component {
  holdShowInfo = true;
  componentDidMount() {
    this.holdShowInfo = false;
    this.canvas = React.createRef();
  }
  componentDidUpdate() {
    const {
      visible,
      close,
      isAutoPlay,
      showResultDelay,
      isRunResultView,
      toggleViewResultStatus,
      currentPhoto,
    } = this.props;

    runAutoPlayHelper(close, {
      visible,
      holdRun: isRunResultView,
      delay: minutesToMilliseconds(showResultDelay),
      isAutoSnapShot: isAutoPlay,
      changeStatus: toggleViewResultStatus,
    });
    if (currentPhoto) {
      cutImage(currentPhoto, this.canvas.current);
    }
  }
  render() {
    const { visible, data, currentPhoto } = this.props;
    return data && visible ? (
      <Container visible={visible}>
        <TopSpace>
          <Img src={data.pic} alt="EW" />

          {currentPhoto && (
            <canvas
              // as="canvas"
              style={{
                background: 'tomato',
                // transform: 'scaleX(-1)',
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
        toggleSnapshotStatus,
        toggleViewResultStatus,
      },
      dispatch,
    ),
)(Result);
