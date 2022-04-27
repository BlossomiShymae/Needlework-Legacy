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
    this.handleContextMenu();
    this.handleCraft();
    this.needlework.setUpdateEventCallback(
      this.handleNeedleworkUpdate.bind(this)
    );
  }

  handleNeedleworkUpdate(messageDTO: MessageDTO) {
    this.win?.webContents.send("needlework-update", messageDTO.object.uri);
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

  handleContextMenu() {
    ipcMain.handle("context-menu", (event, data) => {
      return this.needlework?.contextMenu(data);
    });
  }

  handleCraft() {
    ipcMain.handle("craft", (event, data) => {
      return this.needlework?.craft(data);
    });
  }
}
