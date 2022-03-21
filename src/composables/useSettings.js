import { computed } from "vue";

export default function useSettings(store) {
  const setStore = (sourceState) =>
    store.commit("settings/setStore", sourceState.value);
  const darkMode = computed({
    get() {
      return store.state.settings.darkMode;
    },
    set(value) {
      store.commit("settings/setDarkMode", value);
    },
  });

  return {
    setStore,
    darkMode,
  };
}
