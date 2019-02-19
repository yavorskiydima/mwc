import styled from "styled-components";

const width = 300;
const height = 300;

const pos = {
  left: {
    margin: "-150px 0 0 -400px",
    transform: "scale(0.7)",
    "z-index": "5"
  },
  right: {
    margin: "-150px 0 0 100px",
    transform: "scale(0.7)",
    "z-index": "5"
  },
  front: {
    margin: "-150px 0 0 -150px",
    transform: "scale(1)",
    "z-index": "50"
  },
  back: {
    margin: "-150px 0 0 -150px",
    transform: "scale(0.1)",
    "z-index": "5"
  }
};

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: ${props => (props.visible ? "1" : "0")};
  transition: all 1s linear 1s;
`;

export const Block = styled.div`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  transition: all 0.4s linear;
  margin: ${props => pos[props.position].margin};
  transform: ${props => pos[props.position].transform};
  z-index: ${props => pos[props.position]["z-index"]};
  img {
    width: ${width}px;
  }
`;
