import { millisecondsToMinutes, minutesToMilliseconds } from './common.helpers';

describe('Common helpers', () => {
  it('millisecondsToMinutes, should return 1.6666666269302368 minuets when set 10000 ms', () => {
    expect(Math.fround(millisecondsToMinutes(10000))).toBe(1.6666666269302368);
  });
  it('minutesToMilliseconds, should return 1,  10000 ms 6666667 when set minuets', () => {
    expect(Math.round(minutesToMilliseconds(1.6666667))).toBe(10000);
  });
});
