import { defineStore } from "pinia";
import Serialize from '../utils/Serialize';

interface State {
  darkMode: boolean,
  debugMode: boolean,
  selectedTheme: string,
}

export const useSettingsStore = defineStore("settings", {
  state: (): State => ({
    darkMode: false,
    debugMode: false,
    selectedTheme: "hallowed_seamstress",
  }),
  actions: {
    getStore(): State {
      return {
        darkMode: this.darkMode,
        debugMode: this.debugMode,
        selectedTheme: this.selectedTheme
      }
    },
    // Only use this mutation for initialization of store from persisted storage
    setStore(store: any) {
      this.darkMode = store.darkMode;
      this.debugMode = store.debugMode;
      this.selectedTheme = store.selectedTheme;
    },
    setDarkMode(value: boolean) {
      this.darkMode = value;
    },
    setSelectedTheme(key: string) {
     this.selectedTheme = key;
    },
    async updateConfig() {
      console.log("Pinia: Updating config...");
      console.log(Serialize.prepareForIPC(this));
      return await window.ipcRenderer.invoke(
        "app-set-store",
        Serialize.prepareForIPC(this)
      )
    }
  }
})