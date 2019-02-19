import React, { PureComponent } from 'react';
import styled from 'styled-components';

const speed = '0.25s';
const defSettings = {
  color: '#c0392b',
  colorDark: '#a53125',
  transition: `all ${speed} cubic-bezier(0.310, -0.105, 0.430, 1.400)`,
};

const ButtonWrapper = styled.a`
  display: block;
  background-color: ${defSettings.color};
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
  transition: all ${speed} cubic-bezier(0.31, -0.105, 0.43, 1.4);
  ${Span},
  ${Icon} {
    display: block;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
  }
  &:hover {
    ${Span} {
      left: -72%;
      opacity: 0;
    }

    ${Icon} {
      width: 100%;

      .fa {
        font-size: 45px;
      }
    }
  }
  &.success {
    background-color: #27ae60;

    ${Icon} {
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

    ${Icon} .fa-remove {
      height: 46px;
    }
  }

  &:active {
    opacity: 1;
  }
`;
const Icon = styled.div`
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
`;
const Span = styled.span`
  width: 72%;
  line-height: inherit;
  font-size: 22px;
  text-transform: uppercase;
  left: 0;
  transition: ${defSettings.transition};

  &:after {
    content: '';
    background-color: ${defSettings.colorDark};
    width: 2px;
    height: 70%;
    position: absolute;
    top: 15%;
    right: -1px;
  }
`;

const Button = props => {
  return (
    <ButtonWrapper href="#" role="button">
      <Span>remove</Span>
      <Icon>
        <span class="fa fa-remove">sdfsdf</span>
        <i class="fa fa-check" />
      </Icon>
    </ButtonWrapper>
  );
};
export default Button;
