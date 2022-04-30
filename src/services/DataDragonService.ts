import DataDragon from "../apis/DataDragon";
import { ipcMain } from "electron";
import { IChannel } from "@/channels";

export default class DataDragonService {
  dataDragonAPI: DataDragon;

  constructor() {
    this.dataDragonAPI = new DataDragon();

    this.profileIconHandler();
  }

  profileIconHandler() {
    ipcMain.handle(IChannel.profileIcon, (event, id) => {
      return this.dataDragonAPI.getProfileIcon(id);
    });
  }
}
