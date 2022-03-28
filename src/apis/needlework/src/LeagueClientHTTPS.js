const axios = require("axios");

export default class LeagueClientHTTPS {
  constructor() {
    this.leagueClientAuthentication = null;
    this.instance = null;
  }

  async initialize(leagueClientAuthentication) {
    this.leagueClientAuthentication = leagueClientAuthentication;

    if (this.leagueClientAuthentication.token != null) {
      this.instance = this.createInstance();
    }
  }

  reinit() {
    this.instance = this.createInstance();
  }

  createInstance() {
    const instance = axios.create({
      baseURL: "https://127.0.0.1:" + this.leagueClientAuthentication.port,
      timeout: 10*1000,
      headers: {
        authorization: "Basic " + this.leagueClientAuthentication.auth,
      },
      httpsAgent: this.leagueClientAuthentication.agent,
    });

    return instance;
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
