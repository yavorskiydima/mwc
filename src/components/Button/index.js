import React from 'react';
import styled from 'styled-components';
import camera from './photo-camera.svg';
import ok from './ok.svg';

const speed = '0.25s';
const defSettings = {
  color: '#c0392b',
  colorDark: '#a53125',
  transition: `all ${speed} cubic-bezier(0.310, -0.105, 0.430, 1.400)`,
};

const ButtonWrapper = styled.a`
  display: block;
  background-color: ${({ firstColor }) => firstColor || defSettings.color};
  width: 300px;
  height: 100px;
  line-height: 100px;
  margin: auto;
  color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  transition: ${defSettings.transition};

  span,
  .icon {
    display: block;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
  }

  span {
    width: 72%;
    line-height: inherit;
    font-size: 22px;
    text-transform: uppercase;
    left: 0;
    transition: ${defSettings.transition};

    &:after {
      content: '';
      background-color: ${({ secondColor }) =>
        secondColor || defSettings.colorDark};
      width: 2px;
      height: 70%;
      position: absolute;
      top: 15%;
      right: -1px;
    }
  }

  .icon {
    width: 28%;
    right: 0;
    transition: ${defSettings.transition};

    .fa {
      font-size: 30px;
      vertical-align: middle;
      transition: ${defSettings.transition}, height ${speed} ease;
    }

    .fa-remove {
      height: 36px;
    }

    .fa-check {
      display: none;
    }
  }

  &.success,
  &:hover {
    span {
      left: -72%;
      opacity: 0;
    }

    .icon {
      width: 100%;

      .fa {
        font-size: 45px;
      }
    }
  }

  &.success {
    background-color: #27ae60;

    .icon {
      .fa-remove {
        display: none;
      }

      .fa-check {
        display: inline-block;
      }
    }
  }

  &:hover {
    opacity: 0.9;

    .icon .fa-remove {
      height: 46px;
    }
  }

  &:active {
    opacity: 1;
  }
`;

const Button = props => {
  const { success, text, ...otherProps } = props;
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ButtonWrapper
        href="#"
        role="button"
        className={success ? 'success' : ''}
        {...otherProps}
      >
        <span>{text}</span>
        <div className="icon">
          <img className="fa fa-remove" src={camera} alt="camera" />
          <img className="fa fa-check" src={ok} alt="ok" />
        </div>
      </ButtonWrapper>
    </div>
  );
};
export default Button;
