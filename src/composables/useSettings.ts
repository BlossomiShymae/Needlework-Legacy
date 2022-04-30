import { useSettingsStore } from "@/stores/settings";
import { computed } from "vue";
import themes from "../themes";
import Serialize from "@/utils/Serialize";

/**
 * A Vue composable function that returns user persisted settings.
 * @see {@link ElectronStore} singleton in `Electron` mainland
 * @see {@link useSettingsStore} `pinia` store
 */
export default function useSettings() {
  const store = useSettingsStore();
  // Initialize store
  const setStore = (sourceState: any) => store.setStore(sourceState);
  const getStore = () => store.getStore();

  // Themes and colors
  const darkMode = computed({
    get() {
      return store.darkMode;
    },
    set(value: boolean) {
      store.setDarkMode(value);
      window.ipcRenderer.invoke(
        "app-set-store",
        Serialize.prepareForIPC(store.getStore())
      );
    },
  });
  const selectedTheme = computed({
    get() {
      return store.selectedTheme;
    },
    set(key: string) {
      store.setSelectedTheme(key);
      window.ipcRenderer.invoke(
        "app-set-store",
        Serialize.prepareForIPC(store.getStore())
      );
    },
  });
  const themeItems = [];
  const createLabel = (string: string) => {
    const words = string.split("_");
    const label = words.join(" ");
    return label.replace(/\b(\w)/g, (s) => s.toUpperCase());
  };
  for (const key of themes.keys()) {
    themeItems.push({ label: createLabel(key), value: key });
  }
  const theme = computed(() => {
    const theme = themes.get(selectedTheme.value);
    if (darkMode.value == true) return theme!.dark;
    return theme!.light;
  });

  const multipleLootWarningMode = computed({
    get() {
      return store.multipleLootWarningMode;
    },
    async set(value: boolean) {
      store.setMultipleLootWarningMode(value);
      await store.updateConfig();
    },
  });

  return {
    setStore,
    getStore,
    darkMode,
    selectedTheme,
    themeItems,
    theme,
    multipleLootWarningMode,
  };
}
