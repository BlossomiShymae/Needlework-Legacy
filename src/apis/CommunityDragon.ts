import paths from "../static/paths";
import path from "path";
import DynamicFileService from "../services/DynamicFileService";
export default class CommunityDragon {
  baseURL: string;

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
  
    return JSON.parse(buffer!.toString());
  }

  async getTileIcon(tilePath: string) {
    let tokens = tilePath.split("/");
    tokens = tokens.filter((x) => x !== "");

    // Prepend each token with '/' and lowercase each
    tokens = tokens.map((token) => {
      return (
        "/" + token.replace(/[A-Z]/g, (letter) => `${letter.toLowerCase()}`)
      );
    });

    const endpointGameDataString = (arr: string[]) => {
      const tokens = arr.slice(2);
      return (
        "/latest/plugins/rcp-be-lol-game-data/global/default" + tokens.join("")
      );
    };

    const endpointLolLootString = (arr: string[]) => {
      const tokens = arr.slice(2);
      return "/latest/plugins/rcp-fe-lol-loot/global/default" + tokens.join("");
    };

    const endpointMap = new Map([
      ["/lol-game-data/assets", endpointGameDataString(tokens)],
      ["/fe/lol-loot", endpointLolLootString(tokens)],
    ]);

    const urlPath = endpointMap.get(tokens[0] + tokens[1]);

    const file = new DynamicFileService({
      url: this.baseURL + urlPath,
      responseType: "stream",
      filePath: path.join(
        paths.data,
        "loot_tile_" + tokens[tokens.length - 1].slice(1)
      ),
    });

    const buffer = await file.toBuffer();

    return buffer;
  }
}
