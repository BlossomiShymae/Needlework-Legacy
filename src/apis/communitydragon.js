import paths from "../static/paths";
import DynamicFileService from "../services/DynamicFileService";
export default class CommunityDragon {
  constructor() {
    this.baseURL = "https://raw.communitydragon.org";
  }

  async getLootTranslation() {
    const endpoint =
      "/latest/plugins/rcp-fe-lol-loot/global/default/trans.json";

    const file = new DynamicFileService({
      url: this.baseURL + endpoint,
      responseType: "stream",
      filePath: paths.lootTranslation,
    });

    const buffer = await file.toBuffer();

    return JSON.parse(buffer);
  }
}
