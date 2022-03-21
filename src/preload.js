import { ipcRenderer, contextBridge } from "electron";

// Expose ipcRenderer functions to renderer process.
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => {
    let validChannels = [];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  invoke: async (channel, data) => {
    let validChannels = [
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
  receive: (channel, func) => {
    let validChannels = [];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  once: (channel, func) => {
    let validChannels = [];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

window.ipcRenderer = ipcRenderer;
