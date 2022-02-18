const axios = require("axios");
import paths from "../static/paths";
import FileLoader from "../libs/FileLoader";

export default class CommunityDragon {
  constructor() {
    this.baseURL = "https://raw.communitydragon.org";
    this.fileloader = new FileLoader();
  }

  async getLootTable() {
    const endpoint =
      "/latest/plugins/rcp-fe-lol-loot/global/default/trans.json";
    const file = await this.fileloader.load(
      this.baseURL + endpoint,
      paths.data,
      paths.loottable,
      "stream"
    );

    return JSON.parse(file);
  }
}
