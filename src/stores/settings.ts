import { defineStore } from 'pinia';
import Serialize from '@/utils/Serialize';
import { IChannel } from '@/channels';

interface State {
  darkMode: boolean;
  debugMode: boolean;
  selectedTheme: string;
  multipleLootWarningMode: boolean;
  autoCraftKeyFragmentsMode: boolean;
}

/**
 * A function that returns front-end store instance of user persisted settings.
 * @see {@link useSettings} `Vue` composable
 * @see {@link ElectronStore} singleton in `Electron` mainland
 */
export const useSettingsStore = defineStore('settings', {
  state: (): State => ({
    darkMode: false,
    debugMode: false,
    selectedTheme: 'hallowed_seamstress',
    multipleLootWarningMode: true,
    autoCraftKeyFragmentsMode: false,
  }),
  actions: {
    getStore(): State {
      return {
        darkMode: this.darkMode,
        debugMode: this.debugMode,
        selectedTheme: this.selectedTheme,
        multipleLootWarningMode: this.multipleLootWarningMode,
        autoCraftKeyFragmentsMode: this.autoCraftKeyFragmentsMode,
      };
    },
    // Only use this mutation for initialization of store from persisted storage
    setStore(store: any) {
      this.darkMode = store.darkMode;
      this.debugMode = store.debugMode;
      this.selectedTheme = store.selectedTheme;
      this.multipleLootWarningMode = store.multipleLootWarningMode;
      this.autoCraftKeyFragmentsMode = store.autoCraftKeyFragmentsMode;
    },
    setDarkMode(value: boolean) {
      this.darkMode = value;
    },
    setSelectedTheme(key: string) {
      this.selectedTheme = key;
    },
    async updateConfig() {
      console.log('Pinia: Updating config...');
      return await window.ipcRenderer.invoke(
        IChannel.setStore,
        Serialize.prepareForIPC(this.getStore())
      );
    },
    setMultipleLootWarningMode(value: boolean) {
      this.multipleLootWarningMode = value;
    },
    setAutoCraftKeyFragmentsMode(value: boolean) {
      this.autoCraftKeyFragmentsMode = value;
    },
  },
});
