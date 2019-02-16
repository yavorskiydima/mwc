import React, { Component } from "react";
import video from "./video.mp4";
import styled from "styled-components";
import Workspace from "./containers/Workspace";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
  background-size: cover;
  video {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
  }
`;

class App extends Component {
  render() {
    return (
      <>
        <Workspace />
        <Wrapper>
          <video
            width="100%"
            height="auto"
            preload="auto"
            autoPlay="autoplay"
            loop="loop"
          >
            <source src={video} type="video/mp4" />
          </video>
        </Wrapper>
      </>
    );
  }
}

export default App;
