import DataDragon from "../apis/datadragon";
import { ipcMain } from "electron";

export default class DataDragonService {
  constructor() {
    this.datadragon = new DataDragon();

    this.profileIconHandler();
  }

  profileIconHandler() {
    ipcMain.handle("dd-profile-icon", (event, id) => {
      return this.datadragon.getProfileIcon(id);
    });
  }
}
