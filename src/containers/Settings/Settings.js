import React, { Component } from 'react';
import wheel from './wheel.svg';
import { Container, Menu, Img, MenuContainer } from './Settings.styled';
import { Dropdown, Checkbox } from 'semantic-ui-react';
import { runAutoPlay, stopAutoPlay } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Settings extends Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleCheckboxChange = (e, data) => {
    const { runAutoplay, stopAutoplay } = this.props;
    data.checked ? runAutoplay() : stopAutoplay();
  };
  render() {
    const {
      open,
      devices,
      onClose,
      changeDeviceId,
      value,
      isAutoPlay,
    } = this.props;

    let devicesOptions = [];
    if (devices) {
      devicesOptions = devices.map(device => ({
        value: device.deviceId,
        text: device.label,
      }));
    }
    console.log({ value });
    return (
      <Container>
        <Img spin={open} src={wheel} alt="wheel" onClick={onClose} />
        <Menu open={open}>
          <MenuContainer>
            <h2>Select Camera</h2>
            {/* <Dropdown
              placeholder="Select camera"
              fluid
              selection
              options={devicesOptions}
              value={value}
              onChange={changeDeviceId}
            /> */}
            <select autoFocus value={value} onChange={changeDeviceId}>
              {devices &&
                devices.map((device, key) => (
                  <option key={key} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
            </select>
            <Checkbox
              label="Auto play"
              checked={isAutoPlay}
              onChange={this.handleCheckboxChange}
            />
          </MenuContainer>
        </Menu>
      </Container>
    );
  }
}

export default connect(
  state => ({
    isAutoPlay: state.autoplay.isAutoPlay,
  }),
  dispatch =>
    bindActionCreators(
      {
        runAutoplay: runAutoPlay,
        stopAutoplay: stopAutoPlay,
      },
      dispatch,
    ),
)(Settings);
