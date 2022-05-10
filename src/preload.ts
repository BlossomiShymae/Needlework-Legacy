import { ipcRenderer, contextBridge } from 'electron';
import { SChannel, IChannel, RChannel, OChannel } from './channels';

// Expose ipcRenderer functions to renderer process.
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: SChannel, data: any) => {
    if (Object.values(SChannel).includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  invoke: async (channel: IChannel, data: any) => {
    if (Object.values(IChannel).includes(channel)) {
      return await ipcRenderer.invoke(channel, data);
    }
  },
  receive: (channel: RChannel, func: any) => {
    if (Object.values(RChannel).includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  once: (channel: OChannel, func: any) => {
    if (Object.values(OChannel).includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});
