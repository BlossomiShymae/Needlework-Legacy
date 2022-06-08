import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { IChannel } from '@/channels';
import fs from 'fs';
import path from 'path';
import paths from '@/static/paths';

export default class ElectronService {
  constructor() {
    this.handleApplicationExit();
    this.handleClearImageCache();
    this.handleGetImageCacheSize();
    this.handleGetVersionNumber();
  }

  setWindow(win: BrowserWindow) {
    this.handleWindowMinimize(win);
    this.handleNewWindowEvent(win);
    this.handleWindowHide(win);
  }

  handleNewWindowEvent(win: BrowserWindow) {
    win.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });
  }

  handleWindowMinimize(win: BrowserWindow) {
    ipcMain.handle(IChannel.minimizeWindow, (event, args) => {
      win.minimize();
    });
  }

  handleWindowHide(win: BrowserWindow) {
    ipcMain.handle(IChannel.hideWindow, (event, args) => {
      win.hide();
    });
  }

  handleApplicationExit() {
    ipcMain.handle(IChannel.exitApplication, (event, args) => {
      app.exit(0);
    });
  }

  handleClearImageCache() {
    ipcMain.handle(IChannel.clearImageCache, async (event, args) => {
      try {
        const files = await fs.promises.readdir(paths.data);
        for (const file of files) {
          const ext = path.extname(file);
          if (ext === '.png' || ext === '.jpg') {
            await fs.promises.unlink(path.join(paths.data, file));
          }
        }
        return;
      } catch (error) {
        console.error(error);
      }
    });
  }

  handleGetImageCacheSize() {
    ipcMain.handle(IChannel.getImageCacheSize, async (event, args) => {
      try {
        let cacheSize = 0;
        const files = await fs.promises.readdir(paths.data);
        for (const file of files) {
          const ext = path.extname(file);
          if (ext === '.png' || ext === '.jpg') {
            const { size } = await fs.promises.stat(
              path.join(paths.data, file)
            );
            cacheSize += size;
          }
        }
        return await cacheSize;
      } catch (error) {
        console.error(error);
      }
    });
  }

  handleGetVersionNumber() {
    ipcMain.handle(IChannel.getVersionNumber, async (event, args) => {
      return await app.getVersion();
    });
  }
}
