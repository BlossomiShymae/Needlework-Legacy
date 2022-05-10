import { ref, Ref } from 'vue';
import _ from 'lodash';
import Serialize from '@/utils/Serialize';
import { IChannel } from '@/channels';
import { Context } from '@/enums/context';
import type { ContextMenu } from '@/types/ContextMenu';
import type { PlayerLoot } from '@/types/PlayerLoot';
import type { CraftResponse } from '@/types/CraftResponse';
import { useCraftStatusStore } from '../stores/craftStatus';

export default function useContextMenu() {
  const contextMenuList: Ref<ContextMenu[]> = ref([]);
  const setupContextMenu = async (loot: PlayerLoot) => {
    const rawList = (await window.ipcRenderer.invoke(
      IChannel.contextMenu,
      Serialize.prepareForIPC(loot.lootId)
    )) as ContextMenu[];
    contextMenuList.value = rawList.filter((contextMenu) => {
      switch (contextMenu.actionType) {
        case Context.ActionType.OPEN:
          return true;
          break;
        case Context.ActionType.DISENCHANT:
          if (loot.type.toLowerCase() !== 'currency') return true;
          return false;
          break;
        case Context.ActionType.REDEEM:
          if (contextMenu.enabled) return true;
          return false;
          break;
        default:
          console.log(
            `Unsupported context menu action type: ${contextMenu.actionType}!`
          );
          break;
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
    const data = Serialize.prepareForIPC({
      recipeName: contextMenu.name,
      lootId: loot.lootId,
      repeat: repeat,
    });
    console.log('Sending craft of data: ');
    console.log(data);
    switch (contextMenu.actionType) {
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
            recipeName: contextMenu.name,
            lootId: loot.lootId,
            repeat: 1,
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
