import React, { Component } from 'react';
import { Container, BottomSpace, TopSpace } from './Result.styled';
import { ResultContainer, Title, Img } from '../Common.styled';
import { runAutoPlayHelper, minutesToMilliseconds } from '../../common.helpers';
import { connect } from 'react-redux';

class Result extends Component {
  holdShowInfo = true;
  componentDidMount() {
    this.holdShowInfo = false;
  }
  componentDidUpdate() {
    const { visible, close, isAutoPlay, showResultDelay } = this.props;

    runAutoPlayHelper(close, {
      visible,
      holdRun: this.holdShowInfo,
      delay: minutesToMilliseconds(showResultDelay),
      isAutoSnapShot: isAutoPlay,
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

export default connect(state => ({
  isAutoPlay: state.autoplay.isAutoPlay,
  showResultDelay: state.delaySettings.showResultDelay,
}))(Result);
