import React, { Component } from 'react';

import { Thpace } from '../../services/animation-space';

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
