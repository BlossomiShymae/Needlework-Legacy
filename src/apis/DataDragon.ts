import DynamicFileService from '../services/DynamicFileService';
import paths from '../static/paths';
import path from 'path';
import { AxiosInstance } from 'axios';
const axios = require('axios');

export default class DataDragon {
  baseURL: string;
  axiosInstance: AxiosInstance;

  constructor() {
    this.baseURL = 'https://ddragon.leagueoflegends.com';
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10 * 1000,
    });
  }

  async getProfileIcon(id: string) {
    const latestVersion = await this.getLatestVersion();
    const endpoint =
      '/cdn/' + latestVersion + '/img/profileicon/' + id + '.png';

    const file = new DynamicFileService({
      url: this.baseURL + endpoint,
      responseType: 'stream',
      filePath: path.join(paths.data, 'profileicon_' + id + '.png'),
    });

    const buffer = await file.toBuffer();

    return buffer;
  }

  async getLatestVersion() {
    try {
      const response = await this.axiosInstance.get('/api/versions.json');
      return response.data.shift();
    } catch (error) {
      console.error(error);
    }
  }
}
