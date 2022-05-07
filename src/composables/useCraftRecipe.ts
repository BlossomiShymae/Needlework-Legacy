import { IChannel } from "@/channels";
import Serialize from "@/utils/Serialize";
import { Context } from "@/enums/context";
import { CraftResponse } from "@/types/CraftResponse";
import { useCraftStatusStore } from "@/stores/craftStatus";

export default function useCraftRecipe() {
  const store = useCraftStatusStore();
  const craftRecipe = async (
    recipeName: string,
    lootId: string,
    actionType: string,
    repeat: number
  ) => {
    let response: null | CraftResponse = null;
    const data = Serialize.prepareForIPC({
      recipeName,
      lootId,
      repeat,
    });
    switch (actionType) {
      case Context.ActionType.OPEN:
        response = (await window.ipcRenderer.invoke(
          IChannel.craft,
          data
        )) as CraftResponse;
        break;
      case Context.ActionType.DISENCHANT:
        response = (await window.ipcRenderer.invoke(
          IChannel.craft,
          data
        )) as CraftResponse;
        break;
      case Context.ActionType.REDEEM:
        response = (await window.ipcRenderer.invoke(
          IChannel.craft,
          Serialize.prepareForIPC({
            recipeName,
            lootId,
            repeat: 1,
          })
        )) as CraftResponse;
        break;
      case "FORGE":
        response = (await window.ipcRenderer.invoke(
          IChannel.craft,
          data
        )) as CraftResponse;
        break;

      default:
        break;
    }
    console.log(response);
    if (response !== null) store.addToCraftedHistory(response);
  };

  return {
    craftRecipe,
  };
}
