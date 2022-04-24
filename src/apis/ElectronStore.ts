const Store = require("electron-store");

// const initializeStore = (store, config) => {
//   for (const property in config) {
//     if (store.get(property) == undefined) {
//       console.log(
//         `ElectronStore: Initializing config property ${property}:${config[property].default}`
//       );
//       store.set(property, config[property].default);
//     }
//   }
//   return store;
// };

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
