import React, { Component } from 'react';
import { Video } from './styled-components';
import { VideoService } from '../services/video-service';

export class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  async componentDidMount() {
    const { getVideoInstance } = this.props;

    this.videoInstance = new VideoService(this.videoRef.current);
    const videoArr = await this.videoInstance.getVideoDevices();
    try {
      const deviceId = videoArr.find(i => i.label.match(/HP Webcam HD 4310/i))
        .deviceId;
      this.videoInstance.setDeviceId(deviceId);
    } catch (e) {
      console.warn('Error deviceId', e);
    }

    this.videoInstance.startMediaStream();
    typeof getVideoInstance === 'function' &&
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
