import DataDragon from "../apis/DataDragon";
import { ipcMain } from "electron";

export default class DataDragonService {
  dataDragonAPI: DataDragon;

  constructor() {
    this.dataDragonAPI = new DataDragon();

    this.profileIconHandler();
  }

  profileIconHandler() {
    ipcMain.handle("dd-profile-icon", (event, id) => {
      return this.dataDragonAPI.getProfileIcon(id);
    });
  }
}
