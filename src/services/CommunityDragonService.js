import CommunityDragon from "../apis/communitydragon";
import { ipcMain } from "electron";

export default class CommunityDragonService {
  constructor() {
    this.communitydragon = new CommunityDragon();

    this.lootTranslationHandler();
  }

  lootTranslationHandler() {
    ipcMain.handle("cd-loot-translation", (event) => {
      return this.communitydragon.getLootTranslation();
    });
  }
}
