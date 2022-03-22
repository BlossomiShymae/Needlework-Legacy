import themes from "../themes";
import types from "./types";

// User Configuration Settings
//
// Properties must include a TYPE from 'types' and a default value.
// Config object is injected as a schema into ElectronStore,
//                           as a init state into Vuex,
const config = Object.freeze({
  darkMode: {
    type: types.BOOLEAN,
    default: false,
  },
  debugMode: {
    type: types.BOOLEAN,
    default: false,
  },
  selectedTheme: {
    type: types.STRING,
    default: themes.keys().next().value,
  },
});

const schemaInjector = (config) => {
  let object = {};
  for (const property in config) {
    object[property] = {
      type: config[property].type,
    };
  }
  return object;
};

const vuexInjector = (config) => {
  let object = {};
  for (const property in config) {
    object[property] = config[property].default;
  }
  return object;
};

export { config, schemaInjector, vuexInjector };
