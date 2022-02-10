import NeedleworkLCU from "../apis/needlework.lcu";
import { ipcMain } from "electron";

export default class NeedleworkService {
  constructor() {
    this.needlework = new NeedleworkLCU();

    this.currentSummonerHandler();
    this.walletHandler();
  }

  currentSummonerHandler() {
    ipcMain.handle("current-summoner", (event, args) => {
      return this.needlework.currentSummoner;
    });
  }

  walletHandler() {
    ipcMain.handle("wallet", (event, args) => {
      return this.needlework.wallet;
    });
  }
}
