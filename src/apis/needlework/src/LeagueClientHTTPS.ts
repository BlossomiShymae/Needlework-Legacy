import { AxiosInstance } from 'axios';
import LeagueClientAuth from './LeagueClientAuth';
const axios = require("axios");

export default class LeagueClientHTTPS {
  leagueClientAuthentication: null | LeagueClientAuth;
  axiosInstance: null | AxiosInstance;

  constructor() {
    this.leagueClientAuthentication = null;
    this.axiosInstance = null;
  }

  async initialize(leagueClientAuthentication: LeagueClientAuth) {
    this.leagueClientAuthentication = leagueClientAuthentication;

    if (this.leagueClientAuthentication.token != null) {
      this.axiosInstance = this.createAxiosInstance();
    }
  }

  reinit() {
    this.axiosInstance = this.createAxiosInstance();
  }

  createAxiosInstance() {
    const instance = axios.create({
      baseURL: "https://127.0.0.1:" + this.leagueClientAuthentication?.port,
      timeout: 10*1000,
      headers: {
        authorization: "Basic " + this.leagueClientAuthentication?.auth,
      },
      httpsAgent: this.leagueClientAuthentication?.agent,
    });

    return instance;
  }

  async fetch(api: string) {
    try {
      const response = await this.axiosInstance?.get(api);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  }
}
