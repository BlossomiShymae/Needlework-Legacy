import { Ref, ref } from "vue";
import Serialize from "../utils/Serialize";
import { IChannel } from "@/channels";

function isRefString(
  refString: Ref<string> | string
): refString is Ref<string> {
  return (refString as Ref<string>).value !== undefined;
}

export default async function useTileIcon(tilePath: Ref<string> | string) {
  const tileIcon = ref("");
  let arg: any;
  if (typeof tilePath === "string") {
    arg = Serialize.prepareForIPC(tilePath);
  }
  if (isRefString(tilePath)) {
    arg = Serialize.prepareForIPC(tilePath.value);
  }
  const data = await window.ipcRenderer.invoke(IChannel.tileIcon, arg);

  if (data == null) {
    tileIcon.value = "@/assets/riot_static/rcp-fe-lol-loot/chest_115.png";

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
