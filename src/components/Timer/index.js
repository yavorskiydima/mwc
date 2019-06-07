import React, { useState, useEffect } from 'react';
// import styled from 'stayled-components';

export const Timer = props => {
  const [time, setTime] = useState({ hour: 0, minuets: 0, seconds: 0 });

  useEffect(() => {
    // const interval = setInterval(()=>)
  });
  return null;
};

export function decrimentTime(time) {
  const { hour, minutes, seconds } = time;
  if (!hour && !minutes && !seconds) {
    return time;
  }

  if (!seconds) {
    if (!minutes) {
      return {
        hour: hour - 1,
        minutes: 59,
        seconds: 59,
      };
    } else {
      return {
        hour,
        minutes: minutes - 1,
        seconds: 59,
      };
    }
  }
  return {
    hour,
    minutes,
    seconds: seconds - 1,
  };
}
