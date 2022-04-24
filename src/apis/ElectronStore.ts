const Store = require("electron-store");

export default class ElectronStore {
  static instance: null | ElectronStore = null;
  store: null | any;

  private constructor() { }

  static getInstance() {
    if (ElectronStore.instance != null) return ElectronStore.instance;

    ElectronStore.instance = new ElectronStore();
    ElectronStore.instance.store = new Store({
      darkMode: {
        type: "boolean",
        default: false,
      },
      debugMode: {
        type: "boolean",
        default: false,
      },
      selectedThemes: {
        type: "string",
        default: "hallowed_seamstress"
      }
    });
    return ElectronStore.instance;
  }

  getStore() {
    return this.store.store;
  }

  setStore(store: any) {
    console.log(`ElectronStore: Setting store with state: `);
    console.log(store);
    this.store.store = store;
  }
}
