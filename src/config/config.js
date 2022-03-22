import themes from "../themes";

const config = Object.freeze({
  darkMode: {
    type: "boolean",
    default: false,
  },
  debugMode: {
    type: "boolean",
    default: false,
  },
  selectedTheme: {
    type: "string",
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
