import React, { Component } from 'react';
import { VideoContainer } from '../../components/VideoContainer';
import {
  LeftSpace,
  RigthSpace,
  CommonContainer,
  Title,
} from '../Common.styled';
import { RestApi } from '../../services/rest-service';
import StyledButton from '../../components/Button';

class Start extends Component {
  videoManager = {};
  state = {
    statistic: '',
    isSuccess: false,
  };
  setVideoManager = video => {
    this.videoManager = video;
  };
  componentDidMount() {
    const api = new RestApi();
    api
      .getStatistic()
      .then(r => this.setState({ statistic: JSON.stringify(r) }));
    console.log(window.stream);
  }
  onSuccess = e => {
    const { isSuccess } = this.state;
    e.preventDefault();
    setTimeout(() => {
      this.props.close(this.videoManager);
      this.setState({ isSuccess: false });
    }, 1000);
    this.setState({ isSuccess: !isSuccess });
  };
  render() {
    const { visible } = this.props;
    const { isSuccess } = this.state;

    return (
      <CommonContainer visible={visible}>
        <LeftSpace>
          <VideoContainer
            getVideoInstance={this.setVideoManager}
            width="640px"
            height="480px"
          />
        </LeftSpace>
        <RigthSpace>
          <Title>Which celebrity do you look like?</Title>
          <StyledButton
            firstColor="#30d5c8"
            secondColor="#24b3a7"
            invert
            onClick={this.onSuccess}
            text="create photo"
            success={isSuccess}
          />
        </RigthSpace>
      </CommonContainer>
    );
  }
}

export default Start;
