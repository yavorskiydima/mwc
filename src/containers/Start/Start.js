import React, { Component } from 'react';
import { Wrapper, Camera, Info } from './Start.styled';
import { Button } from '../Components';
import { VideoContainer } from '../../components/VideoContainer';

import web from '../../test/kenny.jpg';
import {RestApi} from '../../services/rest-service'

class Start extends Component {
  videoManager = {};
  state ={
    statistic: ''
  }
  setVideoManager = video => {
    this.videoManager = video;
  };
  componentDidMount() {
    const api = new RestApi();
    api.getStatistic().then(
      r => this.setState({statistic: JSON.stringify(r)})
    )
  }
  handleClick = () => {
    this.props.close(this.videoManager);
  };
  render() {
    const { visible, close } = this.props;
    const {statistic} = this.state;
    return (
      <Wrapper visible={visible}>
        <Camera>
          <VideoContainer
            getVideoInstance={this.setVideoManager}
            width="640px"
            height="480px"
          />
        </Camera>
        <Info>
          <div>
            {statistic}
          </div>
          <Button onClick={this.handleClick}>ПОИСК</Button>
        </Info>
      </Wrapper>
    );
  }
}

export default Start;
