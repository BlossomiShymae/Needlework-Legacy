import Needlework from "../apis/needlework";
import { ipcMain } from "electron";

const POLL_PERIOD = 2500;

export default class NeedleworkService {
  constructor() {
    this.needlework = null;
    this.win = null;
  }

  async initialize(window) {
    const needlework = new Needlework(POLL_PERIOD);
    await needlework.initialize();
    this.needlework = needlework;
    this.win = window;

    this.currentSummonerHandler();
    this.walletHandler();
    this.playerLootMapHandler();
    this.needlework.setUpdateEventCallback(
      this.handleNeedleworkUpdate.bind(this)
    );
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

  playerLootMapHandler() {
    ipcMain.handle("player-loot-map", (event, args) => {
      return this.needlework.playerLootMap;
    });
  }

  handleNeedleworkUpdate(messageDTO) {
    this.win.webContents.send("needlework-update", messageDTO.object.uri);
  }
}
