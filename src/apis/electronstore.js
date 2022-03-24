const Store = require("electron-store");
import { config, schemaInjector } from "../config/config";

const initializeStore = (store, config) => {
  for (const property in config) {
    if (store.get(property) == undefined) {
      console.log(
        `ElectronStore: Initializing config property ${property}:${config[property].default}`
      );
      store.set(property, config[property].default);
    }
  }
  return store;
};

export default class ElectronStore {
  static instance = null;

  constructor() {}

  static getInstance() {
    if (ElectronStore.instance != null) return ElectronStore.instance;

    ElectronStore.instance = new ElectronStore();
    ElectronStore.instance.store = new Store(schemaInjector(config));
    initializeStore(ElectronStore.instance.store, config);
    return ElectronStore.instance;
  }

  getStore() {
    return this.store.store;
  }

  setStore(store) {
    console.log(`ElectronStore: Setting store with state: `);
    console.log(store);
    this.store.store = store;
  }
}