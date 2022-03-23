import { ref } from "vue";
import Serialize from "../utils/Serialize";

export default async function useProfileIcon(currentSummoner) {
  const profileIcon = ref(null);

  const arg = Serialize.prepareForIPC(currentSummoner.value.profileIconId);
  const data = await window.ipcRenderer.invoke("dd-profile-icon", arg);

  const binaryData = [];
  binaryData.push(data);

  const blob = new Blob(binaryData, { type: "image/png" });

  profileIcon.value = window.URL.createObjectURL(blob);

  return {
    profileIcon,
  };
}
