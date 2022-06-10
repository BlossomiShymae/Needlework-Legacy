<template>
  <div class="home">
    <LootMetaPanel />
    <div id="right-grid-area" class="theme-frame-color">
      <div id="loot-view-router" class="styled-scrollbar">
        <router-view v-slot="{ Component }">
          <transition name="swap">
            <component :is="Component" :key="componentKey" />
          </transition>
        </router-view>
      </div>
      <div id="controls-flex">
        <a
          href="https://github.com/MissUwuieTime/Needlework#Guide"
          target="_blank"
          class="w-button"
          ><w-icon>mdi mdi-help-circle-outline</w-icon></a
        >

        <w-menu top min-width="180px">
          <template #activator="{ on }">
            <w-button v-on="on">
              <img
                class="button-icon"
                src="@/assets/riot_static/chest_generic.png"
              />
              <w-icon>mdi mdi-cog-play</w-icon>
              Hextech automation
            </w-button>
          </template>
          <w-checkbox
            v-model="autoCraftKeyFragmentsMode"
            @input="refreshLoot()"
            class="my1"
            >Auto-craft Key Fragments</w-checkbox
          >
          <w-flex column gap="1">
            <w-divider color="grey">Disenchant</w-divider>
            <w-confirm
              class="theme-button fill-width justify-start pa0 bd0"
              no-arrow
              left
              align-bottom
              @confirm="disenchantChampionShards()"
            >
              <w-button class="theme-button fill-width justify-start"
                >Champion Shards</w-button
              >
            </w-confirm>
            <w-confirm
              class="theme-button fill-width justify-start pa0 bd0"
              no-arrow
              left
              align-bottom
              @confirm="disenchantChampionPermanents()"
            >
              <w-button class="theme-button fill-width justify-start">
                Champion Permanents
              </w-button>
            </w-confirm>

            <w-divider color="grey">Smart Disenchant</w-divider>
            <w-confirm
              class="theme-button fill-width justify-start pa0 bd0"
              no-arrow
              left
              align-bottom
              @confirm="smartDisenchantChampionLoots(Loot.Type.CHAMPION_SHARD)"
            >
              <w-button class="theme-button fill-width justify-start"
                >Champion Shards</w-button
              >
            </w-confirm>
            <w-confirm
              class="theme-button fill-width justify-start pa0 bd0"
              no-arrow
              left
              align-bottom
              @confirm="
                smartDisenchantChampionLoots(Loot.Type.CHAMPION_PERMANENT)
              "
            >
              <w-button class="theme-button fill-width justify-start"
                >Champion Permanents</w-button
              >
            </w-confirm>

            <w-divider color="grey">Open</w-divider>
            <w-confirm
              class="theme-button fill-width justify-start pa0 bd0"
              no-arrow
              left
              align-bottom
              @confirm="openAllMaterialsExcludeChests()"
            >
              <w-button class="theme-button fill-width justify-start">
                All Materials, exclude Chests
              </w-button>
            </w-confirm>

            <w-divider color="grey">Upgrade</w-divider>
            <w-confirm
              class="theme-button fill-width justify-start pa0 bd0"
              no-arrow
              left
              align-bottom
              @confirm="upgradeChampionShards('highest')"
            >
              <w-button class="theme-button fill-width justify-start">
                Champion Shards by Highest Tier
              </w-button>
            </w-confirm>

            <w-confirm
              class="theme-button fill-width justify-start pa0 bd0"
              no-arrow
              left
              align-bottom
              @confirm="upgradeChampionShards('lowest')"
            >
              <w-button class="theme-button fill-width justify-start">
                Champion Shards by Lowest Tier
              </w-button>
            </w-confirm>
          </w-flex>
        </w-menu>
        <w-button @click="refreshLoot()"
          ><w-icon>mdi mdi-refresh</w-icon></w-button
        >
        <div class="flex-divider"></div>
        <!-- <w-button><w-icon>mdi mdi-discord</w-icon></w-button> -->
        <w-menu show-on-hover top>
          <template #activator="{ on }">
            <div v-on="on" class="version-info">
              v{{ app_version }}
              <span v-if="isOldVersion" class="ml2 warning text-bold">!</span>
              <span v-else class="ml2 success text-bold">✓</span>
            </div>
          </template>
          <w-flex column gap="1">
            <p>Latest release: v{{ latestVersion }}</p>
            <w-button
              @click="checkForUpdates()"
              class="theme-button fill-width justify-start"
            >
              Check for updates
            </w-button>
            <w-button
              v-if="isOldVersion"
              @click="updateToLatest()"
              class="theme-button fill-width justify-start"
              >Update to latest release</w-button
            >
          </w-flex>
        </w-menu>

        <a
          href="https://github.com/MissUwuieTime/Needlework"
          target="_blank"
          class="w-button"
          ><w-icon>mdi mdi-github</w-icon></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LootMetaPanel from '@/components/panels/LootMetaPanel.vue';
import SummonerCard from '@/components/SummonerCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    SummonerCard,

    LootMetaPanel,
  },
});
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import Time from '@/utils/Time';
import routes from '@/apis/needlework/src/data/routes';
import { IChannel, RChannel } from '@/channels';

import useComponentKey from '@/composables/useComponentKey';
import { useLootStore } from '@/stores/loot';
import useSettings from '@/composables/useSettings';
import { useHextechStatusStore } from '@/stores/hextechStatus';
import usePlayerLoot from '@/composables/usePlayerLoot';
import useCraftRecipe from '@/composables/useCraftRecipe';
import { Context } from '@/enums/context';
import { Loot } from '@/enums/loot';
import useTranslatedLoot from '@/composables/useTranslatedLoot';
import _ from 'lodash';
import Serialize from '@/utils/Serialize';
import { ContextMenu } from '@/types/ContextMenu';
import { WalletDTO } from '@/types/WalletDTO';
import { CurrentSummonerDTO } from '@/types/CurrentSummonerDTO';
import { ChampionMasteryDTO } from '@/types/ChampionMasteryDTO';
import useChampionJSON from '@/composables/useChampionJSON';

// Initalize PlayerLoot and it's store
const playerLootMap = ref({});
playerLootMap.value = await window.ipcRenderer.invoke(IChannel.playerLootMap);
const lootStore = useLootStore();
lootStore.updatePlayerLootMap(playerLootMap.value);

// Initialize loot table for loot translations
const lootTable = ref({});
lootTable.value = await window.ipcRenderer.invoke(IChannel.lootTranslation);
lootStore.setLootTable(lootTable.value);

const { theme } = useSettings();

// App version
const app_version: string = await window.ipcRenderer.invoke(
  IChannel.getVersionNumber
);
const isOldVersion = ref(false);
const latestVersion = ref(app_version);
const checkForUpdates = async () => {
  const result = await window.ipcRenderer.invoke(IChannel.checkForUpdates);
  isOldVersion.value = !!result ?? false;

  if (result !== null) {
    latestVersion.value = result.updateInfo.version;
  }
};
const updateToLatest = async () => {
  const path = await window.ipcRenderer.invoke(IChannel.updateToLatest);
  console.log(path);
};
await checkForUpdates();

router.push('/home/all');
const { componentKey, forceRerender } = useComponentKey();
const hextechStore = useHextechStatusStore();

const { autoCraftKeyFragmentsMode } = useSettings();

const processAutomationPipeline = async () => {
  const { craftRecipe } = useCraftRecipe();
  if (autoCraftKeyFragmentsMode) {
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
  playerLootMap.value = await window.ipcRenderer.invoke(IChannel.playerLootMap);
};

const refreshLoot = async () => {
  playerLootMap.value = await window.ipcRenderer.invoke(IChannel.playerLootMap);
  await processAutomationPipeline();
  lootStore.updatePlayerLootMap(playerLootMap.value);
  hextechStore.updateLootCounters();
  forceRerender(componentKey);
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

onMounted(() => {
  window.ipcRenderer.receive(RChannel.needleworkUpdate, async (uri: any) => {
    if (lootStore.mutex.isLocked() === false) {
      if (uri === routes.PLAYER_LOOT_MAP) {
        console.log(
          'Received event update from NeedleworkService - ' +
            uri +
            ' ' +
            Time.toString()
        );
        await refreshLoot();
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.theme-button {
  filter: brightness(100%);
  transition: filter 0.25s ease-in-out;
  &:hover {
    filter: brightness(125%);
  }
}
.home {
  background-color: inherit;
  --swap-height: calc(93.75%);
}
.swap-enter-active,
.swap-leave-active {
  @extend .styled-scrollbar;

  position: absolute;
  width: 99%;
  height: calc(var(--swap-height) - $window-button-bar-height);
  overflow-y: scroll;

  transition: transform 0.5s ease-in-out;
  transform: translateX(0);
}

.swap-enter-from,
.swap-leave-to {
  position: absolute;
  width: 99%;
  height: calc(var(--swap-height) - $window-button-bar-height);
  transform: translateX(100%);
  overflow-y: scroll;
}

#loot-view-router {
  overflow-y: scroll;
  padding-left: 8px;
}

.home {
  height: 100vh;
  background-color: v-bind('theme.backgroundColor');

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  column-gap: 1px;

  #left-grid-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 64px + 16px;
  }

  #right-grid-area {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15fr 1fr;
    padding-top: 20px;
    overflow: hidden;
  }

  #controls-flex {
    display: flex;
    justify-items: center;
    align-items: center;
    align-content: center;
    gap: 8px;
    color: v-bind('theme.textColor');
    padding-left: 8px;
    padding-right: 8px;

    &:deep(.w-button) {
      color: white;
      background-color: v-bind('theme.paletteColor[0]');
    }

    a.w-button {
      transition: filter 0.25s ease-in-out;
      filter: brightness(100%);
      &:hover {
        filter: brightness(150%);
      }
    }

    .flex-divider {
      flex: 1;
    }

    .version-info {
      height: 100%;
      font-size: 0.875rem;
      width: 100px;
      color: darkgrey;
      border: 1px solid grey;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  #loot-button-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    column-gap: 16px;
    row-gap: 16px;

    margin-top: 32px;
  }
}
</style>
