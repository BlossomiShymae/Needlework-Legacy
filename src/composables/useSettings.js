import { computed } from "vue";
import themes from "../themes";

export default function useSettings(store) {
  // Initialize store
  const setStore = (sourceState) =>
    store.commit("settings/setStore", sourceState.value);

  // Themes and colors
  const darkMode = computed({
    get() {
      return store.state.settings.darkMode;
    },
    set(value) {
      store.commit("settings/setDarkMode", value);
    },
  });
  const selectedTheme = computed({
    get() {
      return store.state.settings.selectedTheme;
    },
    set(key) {
      store.commit("settings/setSelectedTheme", key);
    },
  });
  let themeItems = [];
  const createLabel = (string) => {
    const words = string.split("_");
    const label = words.join(" ");
    return label.replace(/\b(\w)/g, (s) => s.toUpperCase());
  };
  for (const key of themes.keys()) {
    themeItems.push({ label: createLabel(key), value: key });
  }
  const theme = computed(() => {
    let theme = themes.get(selectedTheme.value);
    if (darkMode.value == true) return theme.dark;
    return theme.light;
  });

  return {
    setStore,
    darkMode,
    selectedTheme,
    themeItems,
    theme,
  };
}
