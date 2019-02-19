import styled from "styled-components";

import { CommonContainer } from "../Common.styled";

export const Container = styled(CommonContainer)`
  animation: ${props =>
    props.visible ? "up-size 1s 3s both" : "down-size 1s both"};
`;
