import { AxiosInstance, AxiosResponse } from "axios";
import LeagueClientAuth from "./LeagueClientAuth";
const axios = require("axios");
import { HTTPMethods } from "@/enums/httpMethods";
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
      timeout: 10 * 1000,
      headers: {
        authorization: "Basic " + this.leagueClientAuthentication?.auth,
      },
      httpsAgent: this.leagueClientAuthentication?.agent,
    });

    return instance;
  }

  async fetch(api: string, httpMethod: HTTPMethods, data?: any) {
    let response: undefined | AxiosResponse<any, any>;
    try {
      switch (httpMethod) {
        case HTTPMethods.GET:
          response = await this.axiosInstance?.get(api);
          break;
        case HTTPMethods.POST:
          if (typeof data !== 'undefined') {
            response = await this.axiosInstance?.post(api, data);
          } else {
            response = await this.axiosInstance?.post(api);
          }
          break;
        case HTTPMethods.PUT:
          if (typeof data !== "undefined") {
            response = await this.axiosInstance?.put(api, data);
          } else {
            response = await this.axiosInstance?.put(api);
          }
          break;
        case HTTPMethods.DELETE:
          response = await this.axiosInstance?.delete(api);
          break;
        default:
          response = undefined;
          break;
      }
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  }
}
