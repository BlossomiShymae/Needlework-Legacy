import LeagueClientAuth from "./LeagueClientAuth";

const axios = require("axios");

export default class LeagueClientHTTPS {
  constructor() {
    this.leagueClientAuth = null;
    this.instance = null;
  }

  async initialize() {
    const auth = new LeagueClientAuth();
    await auth.initialize();
    this.leagueClientAuth = auth;

    this.instance = this.createInstance();
  }

  createInstance() {
    return axios.create({
      baseURL: "https://127.0.0.1:" + this.leagueClientAuth.port,
      timeout: 1000,
      headers: { authorization: "Basic " + this.leagueClientAuth.auth },
      httpsAgent: this.leagueClientAuth.agent,
    });
  }

  async fetch(api) {
    try {
      const response = await this.instance.get(api);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
