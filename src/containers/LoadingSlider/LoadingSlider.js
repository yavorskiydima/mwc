import React, { Component } from "react";
import { Container, Block } from "./LoadingSlider.styled";

class LoadingSlider extends Component {
  render() {
    const { visible, delay } = this.props;
    return (
      <Container visible={visible}>
        {this.props.pos.map((item, i) => (
          <Block position={item.position} key={i} delay={delay}>
            <img src={item.pic} alt="EW" />{" "}
          </Block>
        ))}
      </Container>
    );
  }
}

export default LoadingSlider;
