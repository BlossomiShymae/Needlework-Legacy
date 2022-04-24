import { ipcRenderer, contextBridge } from "electron";

// Expose ipcRenderer functions to renderer process.
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel: string, data: any) => {
    const validChannels = [] as string[];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  invoke: async (channel: string, data: any) => {
    const validChannels = [
      "current-summoner",
      "wallet",
      "player-loot-map",
      "dd-profile-icon",
      "cd-loot-translation",
      "cd-tile-icon",
      "app-minimize-window",
      "app-exit-application",
      "app-get-store",
      "app-set-store",
    ];
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, data);
    }
  },
  receive: (channel: string, func: any) => {
    const validChannels = ["needlework-update"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  once: (channel: string, func: any) => {
    const validChannels = [] as string[];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});