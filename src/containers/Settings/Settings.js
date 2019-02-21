import React, { Component } from 'react';
import wheel from './wheel.svg';
import { Container, Menu, Img, MenuContainer } from './Settings.styled';

class Settings extends Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  render() {
    const { open, devices, onClose, changeDeviceId, value } = this.props;
    return (
      <Container>
        <Img spin={open} src={wheel} alt="wheel" onClick={onClose} />
        <Menu open={open}>
          <MenuContainer>
            <h2>Select Camera</h2>
            <select autoFocus value={value} onChange={changeDeviceId}>
              {devices &&
                devices.map((device, key) => {
                  return (
                    <option key={key} value={device.deviceId}>
                      {device.label}
                    </option>
                  );
                })}
            </select>
          </MenuContainer>
        </Menu>
      </Container>
    );
  }
}

export default Settings;
