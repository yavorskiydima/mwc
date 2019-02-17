import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    border: none;
    animation: App-logo-spin infinite 1s linear;
    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  animation: ${props =>
    props.visible ? "up-size-load 1s 1s both" : "down-size-load 1s 1s both"};
  @keyframes up-size-load {
    0% {
      width: 0px;
      height: 0px;
      margin: 0px;
    }
    100% {
      width: 200px;
      height: 200px;
      margin: -100px 0 0 -100px;
    }
  }
  @keyframes down-size-load {
    0% {
      width: 200px;
      height: 200px;
      margin: -100px 0 0 -100px;
    }
    100% {
      width: 0px;
      height: 0px;
      margin: 0px;
    }
  }
`;
