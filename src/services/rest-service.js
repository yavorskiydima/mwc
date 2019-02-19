// This file provide backend service
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import {pFileReader} from '../services/helpers'
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
  async sendPhoto(blob) {
    if (!blob) return false;

    const basePhoto =  await pFileReader(blob);
    const photo = basePhoto.replace(/^data:image\/png;base64,/i, '');    
    
    return this.axios({
      method: 'put',
      url: '/photo/upload',
      data: { photo },
    }).then(({data})=>data)
  }
  getStatistic() {
    return this.axios.get('/statistic').then(({ data }) => data);
  }
}
