import DynamicFileService from "../services/DynamicFileService";
import paths from "../static/paths";
import path from "path";
const axios = require("axios");

export default class DataDragon {
  constructor() {
    this.baseURL = "https://ddragon.leagueoflegends.com";
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 5000,
    });
    this.latestVersion = null;

    this.getLatestVersion();
  }

  async getProfileIcon(id) {
    const endpoint =
      "/cdn/" + this.latestVersion + "/img/profileicon/" + id + ".png";

    const file = new DynamicFileService({
      url: this.baseURL + endpoint,
      responseType: "stream",
      filePath: path.join(paths.data, "profileicon_" + id + ".png"),
    });

    const buffer = await file.toBuffer();

    return buffer;
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
