import { Ref, ref } from "vue";
import { CurrentSummonerDTO } from "@/types/CurrentSummonerDTO";
import Serialize from "../utils/Serialize";

export default async function useProfileIcon(currentSummoner: Ref<CurrentSummonerDTO | null>) {
  const profileIcon = ref("");

  const arg = Serialize.prepareForIPC(currentSummoner.value?.profileIconId);
  const data = await window.ipcRenderer.invoke("dd-profile-icon", arg);

  const binaryData = [];
  binaryData.push(data);

  const blob = new Blob(binaryData, { type: "image/png" });

  profileIcon.value = window.URL.createObjectURL(blob);

  return {
    profileIcon,
  };
}
