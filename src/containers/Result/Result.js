import React, { Component } from 'react';
import { Container, BottomSpace, TopSpace } from './Result.styled';
import {
  LeftSpace,
  RigthSpace,
  ResultContainer,
  Title,
  Img,
  CommonContainer,
} from '../Common.styled';
import StyledButton from '../../components/Button';
import { HOLD_SHOW_RESULT_DELAY } from '../../constants';
import { runAutoPlayHelper } from '../../common.helpers';
import { connect } from 'react-redux';

class Result extends Component {
  holdShowInfo = true;
  componentDidMount() {
    this.holdShowInfo = false;
  }
  componentDidUpdate() {
    const { visible, close, isAutoPlay } = this.props;

    runAutoPlayHelper(close, {
      visible,
      holdRun: this.holdShowInfo,
      delay: HOLD_SHOW_RESULT_DELAY,
      isAutoSnapShot: isAutoPlay,
    });
  }
  render() {
    const { visible, close, data, currentPhoto } = this.props;
    return data && visible ? (
      <Container visible={visible}>
        <TopSpace>
          <Img src={data.pic} alt="EW" />

          {currentPhoto && <Img src={currentPhoto} alt="photo" />}
        </TopSpace>
        <BottomSpace>
          <ResultContainer>
            <Title>{data.name}</Title>
            <p>{data.date}</p>
            <p>{data.description}</p>
          </ResultContainer>
          {/* <StyledButton
            invert
            firstColor="#8f1e59"
            secondColor="#66153f"
            backIcon
            onClick={close}
            text="return back"
            success={false}
          /> */}
        </BottomSpace>
      </Container>
    ) : null;
  }
}

export default connect(state => ({
  isAutoPlay: state.autoplay.isAutoPlay,
}))(Result);
