import React, { Component } from 'react';
import { Container } from './Result.styled';
import {
  LeftSpace,
  RigthSpace,
  ResultContainer,
  Title,
  Img,
} from '../Common.styled';
import StyledButton from '../../components/Button';
import { HOLD_SHOW_RESULT_DELAY, IS_AUTO_SNAPSHOT } from '../../constants';

class Result extends Component {
  holdShowInfo = true;
  componentDidMount() {
    this.holdShowInfo = false;
  }
  componentDidUpdate() {
    const { visible, close } = this.props;
    this.holdShowInfo = !visible;
    if (IS_AUTO_SNAPSHOT && visible && !this.holdShowInfo) {
      setTimeout(() => {
        close();
        this.holdShowInfo = true;
      }, HOLD_SHOW_RESULT_DELAY);
      return;
    }
  }
  render() {
    const { visible, close, data } = this.props;
    return data && visible ? (
      <Container visible={visible}>
        <LeftSpace>
          <Img src={data.pic} alt="EW" />
        </LeftSpace>
        <RigthSpace>
          <ResultContainer>
            <Title>{data.name}</Title>
            <p>{data.date}</p>
            <p>{data.description}</p>
          </ResultContainer>
          <StyledButton
            invert
            firstColor="#8f1e59"
            secondColor="#66153f"
            backIcon
            onClick={close}
            text="return back"
            success={false}
          />
        </RigthSpace>
      </Container>
    ) : null;
  }
}

export default Result;
