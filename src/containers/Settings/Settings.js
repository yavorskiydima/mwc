import React, { Component } from "react";
import wheel from "./wheel.svg";
import { Container, Menu, Img, MenuContainer } from "./Settings.styled";
import { Dropdown } from "semantic-ui-react";

// Example
const cameraOptions = [
  { value: "camera1", text: "camera1" },
  { value: "camera2", text: "camera2" },
  { value: "camera3", text: "camera3" },
  { value: "camera4", text: "camera4" }
];
class Settings extends Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  render() {
    const { open } = this.state;
    return (
      <Container>
        <Img spin={open} src={wheel} alt="wheel" onClick={this.handleClick} />
        <Menu open={open}>
          <MenuContainer>
            <h2>Select Camera</h2>
            <Dropdown
              placeholder="Select camera"
              fluid
              selection
              options={cameraOptions}
            />
          </MenuContainer>
        </Menu>
      </Container>
    );
  }
}

export default Settings;
