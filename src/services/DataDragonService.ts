import DataDragon from '../apis/DataDragon';
import { ipcMain } from 'electron';
import { IChannel } from '@/channels';

export default class DataDragonService {
  dataDragonAPI: DataDragon;

  constructor() {
    this.dataDragonAPI = new DataDragon();

    this.profileIconHandler();
    this.handleChampion();
  }

  profileIconHandler() {
    ipcMain.handle(IChannel.profileIcon, (event, id) => {
      return this.dataDragonAPI.getProfileIcon(id);
    });
  }

  handleChampion() {
    ipcMain.handle(IChannel.champion, (event, data) => {
      return this.dataDragonAPI.getChampion();
    });
  }
}
