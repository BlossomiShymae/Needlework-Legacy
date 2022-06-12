import { Ref, WritableComputedRef } from 'vue';
import _ from 'lodash';
import useCraftRecipe from './useCraftRecipe';
import usePlayerLoot from './usePlayerLoot';
import { useLootStore } from '../stores/loot';
import { Loot } from '@/enums/loot';
import { Context } from '@/enums/context';
import { IChannel } from '@/channels';
import { useHextechStatusStore } from '../stores/hextechStatus';
import { CurrentSummonerDTO } from '@/types/CurrentSummonerDTO';
import { ChampionMasteryDTO } from '@/types/ChampionMasteryDTO';
import useChampionJSON from './useChampionJSON';
import Serialize from '@/utils/Serialize';
import { ContextMenu } from '@/types/ContextMenu';
import useTranslatedLoot from './useTranslatedLoot';
import { WalletDTO } from '@/types/WalletDTO';

/**
 * A Vue composable function that returns functions for Hextech automation.
 * (e.g. smart disenchant, bulk loot crafting...)
 */
export default function useHextechAutomation(cache: {
  autoCraftKeyFragmentsMode: WritableComputedRef<boolean>;
  playerLootMap: Ref<{}>;
  forceRerender: (key: any) => void;
  componentKey: Ref<number>;
}) {
  const hextechStore = useHextechStatusStore();
  const lootStore = useLootStore();

  const processAutomationPipeline = async () => {
    const { craftRecipe } = useCraftRecipe();
    if (cache.autoCraftKeyFragmentsMode) {
      await lootStore.mutex.runExclusive(async () => {
        const { keyFragments } = usePlayerLoot();
        if (keyFragments?.value && keyFragments.value.count >= 3) {
          await craftRecipe(
            Loot.LootId.KEY_FRAGMENT,
            Loot.LootId.KEY_FRAGMENT,
            Context.ActionType.FORGE,
            (keyFragments.value.count / 3) | 0
          );
        }
      });
    }
    cache.playerLootMap.value = await window.ipcRenderer.invoke(
      IChannel.playerLootMap
    );
  };

  const refreshLoot = async () => {
    cache.playerLootMap.value = await window.ipcRenderer.invoke(
      IChannel.playerLootMap
    );
    await processAutomationPipeline();
    lootStore.updatePlayerLootMap(cache.playerLootMap.value);
    hextechStore.updateLootCounters();
    cache.forceRerender(cache.componentKey);
  };

  const disenchantChampionShards = async () => {
    const { craftRecipe } = useCraftRecipe();
    await lootStore.mutex.runExclusive(async () => {
      const { champions } = usePlayerLoot();
      const shards = champions.value.filter((loot) => {
        if (loot.type === Loot.Type.CHAMPION_SHARD) return true;
        return false;
      });
      if (shards.length > 0) {
        for (const shard of shards) {
          await craftRecipe(
            shard.lootId,
            shard.type,
            Context.ActionType.DISENCHANT,
            shard.count
          );
        }
      }
    });
    await refreshLoot();
  };

  const smartDisenchantChampionLoots = async (type: Loot.Type) => {
    const { craftRecipe } = useCraftRecipe();
    await lootStore.mutex.runExclusive(async () => {
      const { champions } = usePlayerLoot();
      const shards = champions.value.filter((loot) => {
        if (loot.type === type) return true;
        return false;
      });
      if (shards.length > 0) {
        const summoner = (await window.ipcRenderer.invoke(
          IChannel.currentSummoner
        )) as CurrentSummonerDTO;
        const championMasteries = (await window.ipcRenderer.invoke(
          IChannel.championMasteries,
          Serialize.prepareForIPC(summoner.summonerId)
        )) as ChampionMasteryDTO[];
        const { getChampion } = await useChampionJSON();

        for (const shard of shards) {
          console.log(shard);
          const contextMenuList = (await window.ipcRenderer.invoke(
            IChannel.contextMenu,
            Serialize.prepareForIPC(shard.lootId)
          )) as ContextMenu[];
          const contextMenu = contextMenuList.find((context) => {
            if (context.actionType === Context.ActionType.UPGRADE) return true;
          });
          let neededShardCount = 0;
          // Is the champion already owned? If upgrade action exists, save three.
          if (contextMenu && contextMenu.enabled) {
            neededShardCount = 3;
            if (shard.count - neededShardCount > 0) {
              await craftRecipe(
                shard.lootId,
                shard.type,
                Context.ActionType.DISENCHANT,
                shard.count - neededShardCount
              );
            }
            continue;
          }
          // Check mastery of owned champion
          const champion = getChampion(shard.itemDesc);
          if (champion) {
            const mastery = _.find(championMasteries, {
              championId: parseInt(champion.key, 10),
            });
            // Is mastery level of champion already at maximum level of 7?
            // If less than 7, count the amount of needed shards to save.
            if (mastery && mastery.championLevel < 7) {
              if (mastery.championLevel <= 5) neededShardCount = 2;
              if (mastery.championLevel === 6) neededShardCount = 1;
            }
            // If summoner hasn't played the champion.
            if (typeof mastery === 'undefined') neededShardCount = 2;
          }
          // Disenchant champion shard(s) based on mastery level.
          if (shard.count - neededShardCount > 0) {
            await craftRecipe(
              shard.lootId,
              shard.type,
              Context.ActionType.DISENCHANT,
              shard.count - neededShardCount
            );
          }
        }
      }
    });
    await refreshLoot();
  };

  const disenchantChampionPermanents = async () => {
    const { craftRecipe } = useCraftRecipe();
    await lootStore.mutex.runExclusive(async () => {
      const { champions } = usePlayerLoot();
      const permanents = champions.value.filter((loot) => {
        if (loot.type === Loot.Type.CHAMPION_PERMANENT) return true;
        return false;
      });
      if (permanents.length > 0) {
        for (const permanent of permanents) {
          await craftRecipe(
            permanent.lootId,
            permanent.type,
            Context.ActionType.DISENCHANT,
            permanent.count
          );
        }
      }
    });
    await refreshLoot();
  };

  const openAllMaterialsExcludeChests = async () => {
    const { craftRecipe } = useCraftRecipe();
    await lootStore.mutex.runExclusive(async () => {
      const { chests } = usePlayerLoot();
      const translatedChests = useTranslatedLoot(chests).translatedLoots;
      const nameWhitelist = [
        'capsule',
        'orb',
        'egg',
        'bag',
        'shard',
        'chest_212',
      ];
      const materials = translatedChests.value.filter((loot) => {
        for (const name of nameWhitelist) {
          if (
            loot.localizedName.toLowerCase().includes(name) ||
            loot.lootName.toLowerCase().includes(name)
          ) {
            return true;
          }
        }
        return false;
      });
      if (materials.length > 0) {
        for (const material of materials) {
          await craftRecipe(
            material.lootId,
            material.type,
            Context.ActionType.OPEN,
            material.count
          );
        }
      }
    });
    await refreshLoot();
  };

  const upgradeChampionShards = async (tierOrder: 'highest' | 'lowest') => {
    const { craftRecipe } = useCraftRecipe();
    await lootStore.mutex.runExclusive(async () => {
      const { champions } = usePlayerLoot();
      const shards = champions.value.filter((loot) => {
        if (loot.type === Loot.Type.CHAMPION_SHARD) return true;
        return false;
      });
      if (shards.length > 0) {
        const sortedShards = _.sortBy(shards, ['upgradeEssenceValue']);
        let currentBlueEssence = (
          (await window.ipcRenderer.invoke(IChannel.wallet)) as WalletDTO
        ).ip;
        if (tierOrder === 'lowest') sortedShards.reverse();
        for (const shard of sortedShards) {
          const contextMenuList = (await window.ipcRenderer.invoke(
            IChannel.contextMenu,
            Serialize.prepareForIPC(shard.lootId)
          )) as ContextMenu[];
          const contextMenu = contextMenuList.find((context) => {
            if (context.actionType === Context.ActionType.UPGRADE) return true;
          });
          // Can the champion shard be upgraded?
          if (contextMenu && contextMenu.enabled) {
            const cost = shard.upgradeEssenceValue || currentBlueEssence;
            // Is there enough blue essence to fulfill the upgrade?
            if (currentBlueEssence >= cost) {
              currentBlueEssence -= cost;
              await craftRecipe(
                shard.lootId,
                shard.type,
                Context.ActionType.UPGRADE,
                1
              );
            } else {
              // Not enough blue essence. End upgrade loop.
              break;
            }
          }
        }
      }
    });
    await refreshLoot();
  };

  return {
    processAutomationPipeline,
    refreshLoot,
    disenchantChampionShards,
    disenchantChampionPermanents,
    smartDisenchantChampionLoots,
    openAllMaterialsExcludeChests,
    upgradeChampionShards,
  };
}
