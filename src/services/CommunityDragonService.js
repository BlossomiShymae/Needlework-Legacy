import CommunityDragon from "../apis/CommunityDragon";
import { ipcMain } from "electron";

export default class CommunityDragonService {
  constructor() {
    this.communitydragon = new CommunityDragon();

    this.lootTranslationHandler();
    this.tileIconHandler();
  }

  lootTranslationHandler() {
    ipcMain.handle("cd-loot-translation", (event) => {
      return this.communitydragon.getLootTranslation();
    });
  }

  tileIconHandler() {
    ipcMain.handle("cd-tile-icon", (event, tilePath) => {
      return this.communitydragon.getTileIcon(tilePath);
    });
  }
}
