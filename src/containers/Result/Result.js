import React, { Component } from 'react';
import { Container, BottomSpace, TopSpace } from './Result.styled';
import { ResultContainer, Title, Img } from '../Common.styled';
import { runAutoPlayHelper, minutesToMilliseconds } from '../../common.helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleViewResultStatus, toggleSnapshotStatus } from '../../actions';

class Result extends Component {
  holdShowInfo = true;
  componentDidMount() {
    this.holdShowInfo = false;
  }
  componentDidUpdate() {
    const {
      visible,
      close,
      isAutoPlay,
      showResultDelay,
      isRunResultView,
      toggleViewResultStatus,
    } = this.props;

    runAutoPlayHelper(close, {
      visible,
      holdRun: isRunResultView,
      delay: minutesToMilliseconds(showResultDelay),
      isAutoSnapShot: isAutoPlay,
      changeStatus: toggleViewResultStatus,
    });
  }
  render() {
    const { visible, close, data, currentPhoto } = this.props;
    return data && visible ? (
      <Container visible={visible}>
        <TopSpace>
          <Img src={data.pic} alt="EW" />

          {currentPhoto && (
            <Img
              style={{ transform: 'scaleX(-1)' }}
              src={currentPhoto}
              alt="photo"
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
