import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  background: linear-gradient(135deg, #3f4c6b 10%,#3f4c6b 10%,#606c88 90%);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  animation: ${props =>
    props.visible ? "up-size 1s 1s both" : "down-size 1s both"};
  @keyframes down-size {
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

@keyframes up-size {
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

export const Camera = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
export const Info = styled.div`
  box-sizing: border-box;
  border-left: 2px solid whitesmoke;
  width: 40%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;
