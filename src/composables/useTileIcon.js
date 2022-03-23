import { ref } from "vue";
import Serialize from "../utils/Serialize";

export default async function useTileIcon(tilePath) {
  const tileIcon = ref(null);

  const arg = Serialize.prepareForIPC(tilePath.value);
  const data = await window.ipcRenderer.invoke("cd-tile-icon", arg);

  if (data == null) {
    tileIcon.value =
      "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png";

    return { tileIcon };
  }

  const binaryData = [];
  binaryData.push(data);

  const blob = new Blob(binaryData, { type: "image/png" });

  tileIcon.value = window.URL.createObjectURL(blob);

  return {
    tileIcon,
  };
}
