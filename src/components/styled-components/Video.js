import styled from 'styled-components';

export const Video = styled.video`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  background: black;
`;
