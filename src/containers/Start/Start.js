import React, { Component } from "react";
import { Button } from "../Components";
import { VideoContainer } from "../../components/VideoContainer";
import { LeftSpace, RigthSpace, CommonContainer } from "../Common.styled";
import { RestApi } from "../../services/rest-service";

class Start extends Component {
  videoManager = {};
  state = {
    statistic: ""
  };
  setVideoManager = video => {
    this.videoManager = video;
  };
  componentDidMount() {
    const api = new RestApi();
    api
      .getStatistic()
      .then(r => this.setState({ statistic: JSON.stringify(r) }));
  }
  handleClick = () => {
    this.props.close(this.videoManager);
  };
  render() {
    const { visible } = this.props;
    const { statistic } = this.state;

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
          <div>{statistic}</div>
          <Button onClick={this.handleClick}>ПОИСК</Button>
        </RigthSpace>
      </CommonContainer>
    );
  }
}

export default Start;
