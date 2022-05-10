import { ipcMain } from 'electron';
import ElectronStore from '../apis/ElectronStore';
import { IChannel } from '@/channels';

export default class ElectronStoreService {
  static instance: null | ElectronStoreService = null;
  electronStore?: null | ElectronStore;

  private constructor() {}

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
    ipcMain.handle(IChannel.getStore, (event, args) => {
      return this.electronStore?.getStore();
    });
  }

  setStoreHandler() {
    ipcMain.handle(IChannel.setStore, (event, store) => {
      if (store !== null && store !== undefined) {
        this.electronStore?.setStore(store);
      }
    });
  }
}
