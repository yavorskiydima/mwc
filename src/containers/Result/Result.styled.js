import styled from "styled-components";

export const Container = styled.div`
position: absolute;
background: linear-gradient(135deg, #3f4c6b 10%,#3f4c6b 10%,#606c88 90%);
border: 2px solid whitesmoke;
border-radius: 10px;
border-radius: 10px;
overflow: hidden;
display: flex;
animation: ${props =>
  props.visible ? "result-up-size 1s 2s both" : "down-size 1s both"};
@keyframes result-down-size {
  0% {
      width: 60%;
      height: 60%;
      top: 20%;
      left: 20%
      padding: 10px;
      border: 2px solid whitesmoke;
    }
  100% {
      width: 0px;
      height: 0px;
      top: 50%;
      left: 50%
      padding: 0px;
      border: none;
  }
}

@keyframes result-up-size {
0% {
  width: 0px;
  height: 0px;
  top: 50%;
  left: 50%
  padding: 0px;
  border: none;
}
100% {
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%
    padding: 10px;
    border: 2px solid whitesmoke;
  }
}
`;
