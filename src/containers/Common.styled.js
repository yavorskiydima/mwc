import styled from "styled-components";

export const CommonContainer = styled.div`
  position: absolute;
  background: mediumslateblue url(/img/shattered-island.gif);
  background-blend-mode: hard-light;
  opacity: 0.8;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  z-index: 4;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  padding: 10px;
  border: 2px solid whitesmoke;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
    inset 0 -10px 20px rgba(255, 255, 255, 0.3);
  animation: ${props =>
    props.visible ? "up-size 1s 1s both" : "down-size 1s both"};
  @keyframes down-size {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }

  @keyframes up-size {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const LeftSpace = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  width: 60%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
`;
export const RigthSpace = styled.div`
  box-sizing: border-box;
  width: 40%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
`;
