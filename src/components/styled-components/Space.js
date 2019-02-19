import React, { Component } from 'react';
import styled from 'styled-components';
import { Thpace } from '../../services/animation-space';

const SpaceContainerWrapper = styled.div`
  width: 60vw;
  heigth: 70vh;
  margin: auto;
  background: tomato;
`;

export class Space extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    this.canvas = new Thpace(this.canvasRef.current);
    this.canvas.start();
  }
  render() {
    return <canvas ref={this.canvasRef} />;
  }
}
