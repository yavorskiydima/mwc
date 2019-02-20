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

class Result extends Component {
  render() {
    const { visible, close, data } = this.props;
    return data ? (
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
