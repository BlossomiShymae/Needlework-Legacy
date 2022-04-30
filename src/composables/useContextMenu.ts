import { ref, Ref } from "vue";
import _ from "lodash";
import Serialize from "@/utils/Serialize";
import { Context } from "@/enums/context";
import type { ContextMenu } from "@/types/ContextMenu";
import type { PlayerLoot } from "@/types/PlayerLoot";
import type { CraftResponse } from "@/types/CraftResponse";
import { useCraftStatusStore } from "../stores/craftStatus";

export default function useContextMenu() {
  const contextMenuList: Ref<ContextMenu[]> = ref([]);
  const setupContextMenu = async (loot: PlayerLoot) => {
    const rawList = (await window.ipcRenderer.invoke(
      "context-menu",
      Serialize.prepareForIPC(loot.lootId)
    )) as ContextMenu[];
    contextMenuList.value = rawList.filter((contextMenu) => {
      if (
        Object.values(Context.ActionType).includes(
          contextMenu.actionType as Context.ActionType
        )
      ) {
        return true;
      }
    });
  };
  const store = useCraftStatusStore();
  const doAction = async (
    loot: PlayerLoot,
    contextMenu: ContextMenu,
    repeat: number
  ) => {
    let response: null | CraftResponse = null;
    switch (contextMenu.actionType) {
      case Context.ActionType.OPEN:
        response = (await window.ipcRenderer.invoke(
          "craft",
          Serialize.prepareForIPC({
            recipeName: contextMenu.name,
            lootId: loot.lootId,
            repeat: repeat,
          })
        )) as CraftResponse;
        break;

      default:
        break;
    }
    if (response !== null) store.addToCraftedHistory(response);
  };

  return {
    contextMenuList,
    setupContextMenu,
    doAction,
    capitalize: _.capitalize,
  };
}
