import Needlework from "../apis/needlework";
import { BrowserWindow, ipcMain } from "electron";
import { MessageDTO } from "@/types/MessageDTO";

const POLL_PERIOD = 2500;

export default class NeedleworkService {
  needlework: null | Needlework;
  win: null | BrowserWindow;
  
  constructor() {
    this.needlework = null;
    this.win = null;
  }

  async initialize(window: BrowserWindow) {
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
      return this.needlework?.currentSummoner();
    });
  }

  walletHandler() {
    ipcMain.handle("wallet", (event, args) => {
      return this.needlework?.wallet();
    });
  }

  playerLootMapHandler() {
    ipcMain.handle("player-loot-map", (event, args) => {
      return this.needlework?.playerLootMap();
    });
  }

  handleNeedleworkUpdate(messageDTO: MessageDTO) {
    this.win?.webContents.send("needlework-update", messageDTO.object.uri);
  }
}
