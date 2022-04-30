import CommunityDragon from "../apis/CommunityDragon";
import { ipcMain } from "electron";
import { IChannel } from "@/channels";

export default class CommunityDragonService {
  communityDragonAPI: CommunityDragon;

  constructor() {
    this.communityDragonAPI = new CommunityDragon();

    this.lootTranslationHandler();
    this.tileIconHandler();
  }

  lootTranslationHandler() {
    ipcMain.handle(IChannel.lootTranslation, (event) => {
      return this.communityDragonAPI.getLootTranslation();
    });
  }

  tileIconHandler() {
    ipcMain.handle(IChannel.tileIcon, (event, tilePath) => {
      return this.communityDragonAPI.getTileIcon(tilePath);
    });
  }
}
