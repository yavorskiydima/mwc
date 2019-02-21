import React, { Component } from "react";
import wheel from "./wheel.svg";
import { Container, Menu, Img, MenuContainer } from "./Settings.styled";

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
            <select>
              <option>Test1</option>
              <option>Test2</option>
            </select>
          </MenuContainer>
        </Menu>
      </Container>
    );
  }
}

export default Settings;
