import { ref } from "vue";

export default async function useProfileIcon(currentSummoner) {
  const profileIcon = ref(null);

  const arg = JSON.parse(JSON.stringify(currentSummoner.value.profileIconId));
  const data = await window.ipcRenderer.invoke("dd-profile-icon", arg);

  const binaryData = [];
  binaryData.push(data);

  const blob = new Blob(binaryData, { type: "image/png" });

  profileIcon.value = window.URL.createObjectURL(blob);

  return {
    profileIcon,
  };
}
