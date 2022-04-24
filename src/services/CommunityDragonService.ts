import CommunityDragon from "../apis/CommunityDragon";
import { ipcMain } from "electron";

export default class CommunityDragonService {
  communityDragonAPI: CommunityDragon;

  constructor() {
    this.communityDragonAPI = new CommunityDragon();

    this.lootTranslationHandler();
    this.tileIconHandler();
  }

  lootTranslationHandler() {
    ipcMain.handle("cd-loot-translation", (event) => {
      return this.communityDragonAPI.getLootTranslation();
    });
  }

  tileIconHandler() {
    ipcMain.handle("cd-tile-icon", (event, tilePath) => {
      return this.communityDragonAPI.getTileIcon(tilePath);
    });
  }
}
