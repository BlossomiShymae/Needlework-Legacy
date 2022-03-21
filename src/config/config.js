const config = Object.freeze({
  darkMode: {
    type: "boolean",
    default: false,
  },
  debugMode: {
    type: "boolean",
    default: false,
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
  console.log(object);
  return object;
};

export { config, schemaInjector, vuexInjector };
