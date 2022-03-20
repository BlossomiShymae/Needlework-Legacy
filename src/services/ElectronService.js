import { app, ipcMain } from "electron";

export default class ElectronService {
  constructor() {
    this.exitApplicationHandler();
  }

  setWindow(win) {
    this.minimizeWindowHandler(win);
  }

  minimizeWindowHandler(win) {
    ipcMain.handle("app-minimize-window", (event, args) => {
      win.minimize();
    });
  }

  exitApplicationHandler() {
    ipcMain.handle("app-exit-application", (event, args) => {
      app.exit(0);
    });
  }
}
