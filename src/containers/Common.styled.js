import styled from 'styled-components';

export const CommonContainer = styled.div`
  position: absolute;
  background-image: url(/img/shattered-island.gif);
  opacity: 0.8;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  z-index: 4;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4),
    inset 0 -10px 20px rgba(255, 255, 255, 0.3);
  animation: ${props =>
    props.visible ? 'up-size 1s 1s both' : 'down-size 1s both'};
  @keyframes down-size {
    0% {
      width: 60%;
      height: 60%;
      top: 20%;
      left: 20%;
      padding: 10px;
      border: 2px solid whitesmoke;
      opacity: 1;
    }
    100% {
      width: 0px;
      height: 0px;
      top: 50%;
      left: 50%;
      padding: 0px;
      border: none;
      opacity: 0;
    }
  }

  @keyframes up-size {
    0% {
      width: 0px;
      height: 0px;
      top: 50%;
      left: 50%;
      padding: 0px;
      border: none;
      opacity: 0;
    }
    100% {
      width: 60%;
      height: 60%;
      top: 20%;
      left: 20%;
      padding: 10px;
      border: 2px solid whitesmoke;
      opacity: 1;
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
`;
export const RigthSpace = styled.div`
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
