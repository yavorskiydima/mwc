import styled from 'styled-components';

import { CommonContainer } from '../Common.styled';

export const Container = styled(CommonContainer)`
  animation: ${props =>
    props.visible ? 'up-size 1s 3s both' : 'down-size 1s both'};
  display: flex;
  flex-flow: column nowrap;
`;

export const TopSpace = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 70%;
`;
export const BottomSpace = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  background: rgba(0, 0, 0, 0.6);
`;
