import { ipcMain } from "electron";
import ElectronStore from "../apis/ElectronStore";

export default class ElectronStoreService {
  static instance = null;
  constructor() {}

  static getInstance() {
    if (ElectronStoreService.instance != null)
      return ElectronStoreService.instance;

    ElectronStoreService.instance = new ElectronStoreService();
    ElectronStoreService.instance.electronStore = ElectronStore.getInstance();
    ElectronStoreService.instance.getStoreHandler();
    ElectronStoreService.instance.setStoreHandler();

    return ElectronStoreService.instance;
  }

  getStoreHandler() {
    ipcMain.handle("app-get-store", (event, args) => {
      return this.electronStore.getStore();
    });
  }

  setStoreHandler() {
    ipcMain.handle("app-set-store", (event, store) => {
      if (store !== null && store !== undefined) {
        this.electronStore.setStore(store);
      }
    });
  }
}
