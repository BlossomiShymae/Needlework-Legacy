import { IChannel } from "@/channels";
import Serialize from "@/utils/Serialize";
import { Context } from "@/enums/context";
import { CraftResponse } from "@/types/CraftResponse";
import { useCraftStatusStore } from "@/stores/craftStatus";

export default function useCraftRecipe() {
  const store = useCraftStatusStore();
  const craftRecipe = async (
    lootId: string,
    actionType: Context.ActionType,
    repeat: number
  ) => {
    let response: null | CraftResponse = null;
    const recipeName = `${lootId}_${actionType.toLowerCase()}`;
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
      case Context.ActionType.FORGE:
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
