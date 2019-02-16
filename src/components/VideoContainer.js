import React, { Component } from 'react';
import { Video, Container } from './styled-components';

export class VideoContainer extends Component {
  render() {
    return (
      <Container>
        <Video />
      </Container>
    );
  }
}
