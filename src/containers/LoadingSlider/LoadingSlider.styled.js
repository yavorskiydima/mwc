import styled from "styled-components";

const width = 300;
const height = 400;

const pos = {
  left: {
    transform: "scale(0.7) translateX(-150%)",
    "z-index": "2"
  },
  right: {
    transform: "scale(0.7) translateX(150%)",
    "z-index": "3"
  },
  front: {
    transform: "scale(1)",
    "z-index": "50"
  },
  back: {
    transform: "scale(0.01)",
    "z-index": "2"
  }
};

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: ${props => (props.visible ? "1" : "0")};
  transition: ${props =>
    props.visible ? "all 1s linear 1s;" : "all 1s linear 2s;"};
`;

export const Block = styled.div`
  position: absolute;
  overflow: hidden;
  background-image: url(/img/shattered-island.gif);
  border-radius: 10px;
  border: 2px solid whitesmoke;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
    inset 0 -10px 20px rgba(255, 255, 255, 0.3);
  width: ${width}px;
  height: ${height}px;
  transition: all 0.7s linear;
  margin: -150px 0 0 -150px;
  will-change: transform;
  transform: ${props => pos[props.position].transform};
  z-index: ${props => pos[props.position]["z-index"]};
  img {
    width: 100%;
  }
`;
