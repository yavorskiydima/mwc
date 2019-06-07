import { decrimentTime } from './index';
describe('decrimentTime', () => {
  it('should return time less one second case 1', () => {
    const time = {
      hour: 1,
      minutes: 1,
      seconds: 59,
    };
    const time1 = {
      hour: 1,
      minutes: 1,
      seconds: 58,
    };
    expect(decrimentTime(time)).toEqual(time1);
  });
  it('should return time less one second case 2', () => {
    const time = {
      hour: 1,
      minutes: 1,
      seconds: 0,
    };
    const time1 = {
      hour: 1,
      minutes: 0,
      seconds: 59,
    };
    expect(decrimentTime(time)).toEqual(time1);
  });
  it('should return time less one second case 3', () => {
    const time = {
      hour: 1,
      minutes: 0,
      seconds: 0,
    };
    const time1 = {
      hour: 0,
      minutes: 59,
      seconds: 59,
    };
    expect(decrimentTime(time)).toEqual(time1);
  });
  it('should return time less one second case 4', () => {
    const time = {
      hour: 0,
      minutes: 0,
      seconds: 0,
    };
    const time1 = {
      hour: 0,
      minutes: 0,
      seconds: 0,
    };
    expect(decrimentTime(time)).toEqual(time1);
  });
});
