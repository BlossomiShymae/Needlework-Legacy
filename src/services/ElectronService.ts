import { app, BrowserWindow, ipcMain } from "electron";
import { IChannel } from "@/channels";

export default class ElectronService {
  constructor() {
    this.handleApplicationExit();
  }

  setWindow(win: BrowserWindow) {
    this.handleWindowMinimize(win);
  }

  handleWindowMinimize(win: BrowserWindow) {
    ipcMain.handle(IChannel.minimizeWindow, (event, args) => {
      win.minimize();
    });
  }

  handleApplicationExit() {
    ipcMain.handle(IChannel.exitApplication, (event, args) => {
      app.exit(0);
    });
  }
}
