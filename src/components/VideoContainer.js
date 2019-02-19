import React, { Component } from "react";
import { Video } from "./styled-components";
import { VideoService } from "../services/video-service";

export class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    const { getVideoInstance } = this.props;

    this.videoInstance = new VideoService(this.videoRef.current);
    this.videoInstance.startMediaStream();
    typeof getVideoInstance === "function" &&
      getVideoInstance(this.videoInstance);
  }
  componentWillUnmount() {
    this.videoInstance.stopMediaStream();
  }

  render() {
    const { width, height } = this.props;

    return (
      <Video
        ref={this.videoRef}
        width={width}
        height={height}
        playsInline
        autoPlay
      />
    );
  }
}
