const axios = require("axios");

export default class DataDragon {
  constructor() {
    this.instance = axios.create({
      baseURL: "https://ddragon.leagueoflegends.com",
      timeout: 1000,
    });

    this.latestVersion = null;

    this.getLatestVersion();
  }

  async profileIcon(id) {
    // Check if stored in data cache before accessing DataDragon.
    try {
      const path =
        "/cdn/" + this.latestVersion + "/img/profileicon/" + id + ".png";
      const response = await this.instance.get(path, {
        responseType: "arraybuffer",
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getLatestVersion() {
    try {
      const response = await this.instance.get("/api/versions.json");
      this.latestVersion = response.data.shift();
    } catch (error) {
      console.error(error);
    }
  }
}
