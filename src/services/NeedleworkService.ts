import Needlework from '../apis/needlework';
import { BrowserWindow, ipcMain } from 'electron';
import { MessageDTO } from '@/types/MessageDTO';
import { IChannel, RChannel } from '@/channels';

const POLL_PERIOD = 2500;

export default class NeedleworkService {
  needlework: null | Needlework;
  win: null | BrowserWindow;
  eventFnList: Array<(a: MessageDTO) => void>;

  constructor() {
    this.needlework = null;
    this.win = null;
    this.eventFnList = [];
  }

  addFnToEventListener(fn: (a: MessageDTO) => void) {
    this.eventFnList.push(fn);
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
    this.handleChampionMasteries();
    this.handleOwnedChampionsMinimal();
    this.needlework.setUpdateEventCallback(
      this.handleNeedleworkUpdate.bind(this)
    );
    this.handleIsClientActive();
  }

  handleNeedleworkUpdate(messageDTO: MessageDTO) {
    this.win?.webContents.send(
      RChannel.needleworkUpdate,
      messageDTO.object.uri
    );

    if (this.eventFnList.length > 0) {
      this.eventFnList.forEach((fn) => {
        fn(messageDTO);
      });
    }
  }

  currentSummonerHandler() {
    ipcMain.handle(IChannel.currentSummoner, (event, args) => {
      return this.needlework?.currentSummoner();
    });
  }

  walletHandler() {
    ipcMain.handle(IChannel.wallet, (event, args) => {
      return this.needlework?.wallet();
    });
  }

  playerLootMapHandler() {
    ipcMain.handle(IChannel.playerLootMap, (event, args) => {
      return this.needlework?.playerLootMap();
    });
  }

  handleContextMenu() {
    ipcMain.handle('context-menu', (event, data) => {
      return this.needlework?.contextMenu(data);
    });
  }

  handleCraft() {
    ipcMain.handle(
      'craft',
      (
        event,
        {
          recipeName,
          lootId,
          repeat,
        }: { recipeName: string; lootId: string; repeat: number }
      ) => {
        return this.needlework?.craft(recipeName, lootId, repeat);
      }
    );
  }

  handleChampionMasteries() {
    ipcMain.handle(IChannel.championMasteries, (event, summonerId: number) => {
      return this.needlework?.championMasteries(summonerId);
    });
  }

  handleOwnedChampionsMinimal() {
    ipcMain.handle(IChannel.ownedChampionsMinimal, (event, data: any) => {
      return this.needlework?.ownedChampionsMinimal();
    });
  }

  handleIsClientActive() {
    ipcMain.handle(IChannel.isClientActive, (event) => {
      return this.needlework?.isClientActive() ?? false;
    });
  }
}
