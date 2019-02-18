import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: ${props => (props.visible ? "1" : "0")};
  animation: ${props =>
    props.visible ? "up-size-load 1s 1s both" : "down-size-load 1s both"};
`;
