import React, { Component } from 'react';
import wheel from './wheel.svg';
import { Container, Menu, Img, MenuContainer } from './Settings.styled';
import { Select, Checkbox, Form, Input, Dropdown } from 'semantic-ui-react';
import {
  runAutoPlay,
  stopAutoPlay,
  setSnapshotDelay,
  setShowResultDelay,
} from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const minutes = Array(59)
  .fill(0)
  .map(Number.call, Number)
  .map(minute => ({
    text: minute,
    value: minute,
  }));

class Settings extends Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleCheckboxChange = (e, data) => {
    const { runAutoplay, stopAutoplay } = this.props;
    data.checked ? runAutoplay() : stopAutoplay();
  };
  handleChangeSnapshotDelay = (_, data) => {
    const { setSnapshotDelay } = this.props;
    setSnapshotDelay(data.value);
  };
  handleChangeShowResultDelay = (_, data) => {
    const { setShowResultDelay } = this.props;
    setShowResultDelay(data.value);
  };
  render() {
    const {
      open,
      devices,
      onClose,
      changeDeviceId,
      value,
      isAutoPlay,
      showResultDelay,
      snapshotDelay,
    } = this.props;

    let devicesOptions = [];
    if (devices) {
      devicesOptions = devices.map(device => ({
        value: device.deviceId,
        text: device.label,
      }));
    }

    return (
      <Container>
        <Img spin={open} src={wheel} alt="wheel" onClick={onClose} />
        <Menu open={open}>
          <MenuContainer>
            <Form>
              <h2>Settings</h2>
              {/* todo: configure Dropdown */}
              <label>Select video device</label>
              <Dropdown
                placeholder="Select camera"
                fluid
                selection
                options={devicesOptions}
                value={value}
                onChange={changeDeviceId}
              />
              {/* <select autoFocus value={value} onChange={changeDeviceId}>
                {devices &&
                  devices.map((device, key) => (
                    <option key={key} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
              </select> */}
              <Checkbox
                label="Auto play"
                checked={isAutoPlay}
                onChange={this.handleCheckboxChange}
              />
              <div>
                <label>Snapshot delay:</label>
                <Dropdown
                  fluid
                  selection
                  placeholder="Min"
                  options={minutes}
                  value={snapshotDelay}
                  onChange={this.handleChangeSnapshotDelay}
                />
              </div>
              <div>
                <label>Show result delay:</label>
                <Dropdown
                  fluid
                  selection
                  placeholder="Min"
                  options={minutes}
                  value={showResultDelay}
                  onChange={this.handleChangeShowResultDelay}
                />
              </div>
            </Form>
          </MenuContainer>
        </Menu>
      </Container>
    );
  }
}

export default connect(
  state => ({
    isAutoPlay: state.autoplay.isAutoPlay,
    snapshotDelay: state.delaySettings.snapshotDelay,
    showResultDelay: state.delaySettings.showResultDelay,
  }),
  dispatch =>
    bindActionCreators(
      {
        runAutoplay: runAutoPlay,
        stopAutoplay: stopAutoPlay,
        setSnapshotDelay,
        setShowResultDelay,
      },
      dispatch,
    ),
)(Settings);
