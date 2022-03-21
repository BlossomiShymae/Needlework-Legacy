const createIpcRendererPlugin = (store) => {
  store.subscribe((mutation) => {
    if (
      mutation.type.includes("settings") &&
      mutation.type != "settings/setStore"
    ) {
      console.log(mutation.type);
      store.dispatch("settings/updateConfig");
    }
  });
};

export default createIpcRendererPlugin;
