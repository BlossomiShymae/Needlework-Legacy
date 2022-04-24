import { app, BrowserWindow, ipcMain } from "electron";

export default class ElectronService {
  constructor() {
    this.handleApplicationExit();
  }

  setWindow(win: BrowserWindow) {
    this.handleWindowMinimize(win);
  }

  handleWindowMinimize(win: BrowserWindow) {
    ipcMain.handle("app-minimize-window", (event, args) => {
      win.minimize();
    });
  }

  handleApplicationExit() {
    ipcMain.handle("app-exit-application", (event, args) => {
      app.exit(0);
    });
  }
}
