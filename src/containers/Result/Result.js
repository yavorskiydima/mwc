import React, { Component } from 'react';
import { Button } from '../Components';
import { Container } from './Result.styled';
import { LeftSpace, RigthSpace } from '../Common.styled';
import StyledButton from '../../components/Button';

class Result extends Component {
  render() {
    const { visible, close, data } = this.props;
    return (
      <Container visible={visible}>
        <LeftSpace>{data && <img src={data.pic} alt="EW" />}</LeftSpace>
        <RigthSpace>
          <StyledButton
            invert
            firstColor="#003366"
            secondColor="#001a33"
            backIcon
            onClick={close}
            text="return back"
            success={false}
          />
        </RigthSpace>
      </Container>
    );
  }
}

export default Result;
