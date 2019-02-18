// This file provide backend service
import axios from 'axios';
import { BACKEND_URL } from '../constants';
const headers = {
  'Content-Type': 'application/json',
};

export class RestApi {
  constructor(instance) {
    this.axios =
      instance ||
      axios.create({
        baseURL: BACKEND_URL,
        headers,
      });
  }
  sendPhoto(blob) {
    if (!blob) return false;

    const photo = btoa(blob);
    return this.axios({
      method: 'put',
      url: '/photo/upload',
      data: { photo },
    }).then(({ data }) => data);
  }
  getStatistic() {
    return this.axios.get('/statistic').then(({ data }) => data);
  }
}
