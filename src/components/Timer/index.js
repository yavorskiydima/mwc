import React from 'react';
import styled from 'styled-components';
import Timer from 'react-compound-timer';

const TimerWrapper = styled.div`
  color: #30d5c8;
  font-size: 6em;
  line-height: 3em;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  font-weight: 800;
`;

const CustomTimer = ({
  time,
  direction = 'backward',
  resetFunc,
  startFunc,
}) => {
  return (
    <Timer
      initialTime={time}
      direction={direction}
      formatValue={value => `${value < 10 ? `0${value}` : value}`}
    >
      {({ reset, start }) => {
        // startFunc(start);
        // resetFunc(reset);
        return (
          <TimerWrapper>
            <Timer.Minutes />:
            <Timer.Seconds />
          </TimerWrapper>
        );
      }}
    </Timer>
  );
};

export default CustomTimer;
