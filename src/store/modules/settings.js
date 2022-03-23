import { config, vuexInjector } from "../../config/config";
import Serialize from "../../utils/Serialize";

const settings = {
  namespaced: true,
  state: {
    ...vuexInjector(config),
  },
  mutations: {
    // Only use this mutation for initialization of store from persisted storage
    setStore(state, store) {
      for (const property in state) {
        state[property] = store[property];
      }
    },
    setDarkMode(state, truthValue) {
      state.darkMode = truthValue;
    },
    setSelectedTheme(state, key) {
      state.selectedTheme = key;
    },
  },
  actions: {
    async updateConfig(context) {
      console.log("Vuex: Updating config...");
      console.log(Serialize.prepareForIPC(context.state));
      return await window.ipcRenderer.invoke(
        "app-set-store",
        Serialize.prepareForIPC(context.state)
      );
    },
  },
};

export default settings;
