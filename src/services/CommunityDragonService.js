import CommunityDragon from "../apis/communitydragon";
import { ipcMain } from "electron";

export default class CommunityDragonService {
  constructor() {
    this.communitydragon = new CommunityDragon();

    this.lootTableHandler();
  }

  lootTableHandler() {
    ipcMain.handle("cd-loot-table", (event) => {
      return this.communitydragon.getLootTable();
    });
  }
}
