import { RestApi } from './rest-service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let api, mock;
describe('RestAPI', () => {
  beforeEach(() => {
    const client = axios.create();
    mock = new MockAdapter(client);
    api = new RestApi(client);
  });

  it('getStatistic', async () => {
    const json = {
      result: 'ok',
      house_stats: {
        targarien: 122,
        stark: 53,
        taily: 1,
      },
    };
    mock.onGet('/statistic').reply(200, json);

    const result = await api.getStatistic();
    expect(mock.history.get.length).toBe(1);

    expect(result).toEqual(json);
  });
  it('sendPhoto', async () => {
    const response = [
      200,
      {
        result: 'ok',
        charaster: {
          id: 1,
          name: 'Arya Stark',
          uniq_key: 'arya-stark',
        },
      },
    ];
    const debug = { hello: 'world' };
    const simpleBlob = new Blob([JSON.stringify(debug, null, 2)], {
      type: 'application/json',
    });

    mock.onAny().reply(config => {
      const method = 'PUT';
      const url = '/photo/upload';
      if (config.url === url && config.method.toUpperCase() === method) {
        return response;
      }
      return [500, {}];
    });

    expect(api.sendPhoto()).toBeFalsy();

    const resp = await api.sendPhoto(simpleBlob);
    expect(JSON.parse(mock.history.put[0].data)).toEqual({
      photo: btoa(simpleBlob),
    });
    expect(resp).toEqual(response[1]);
  });
});
