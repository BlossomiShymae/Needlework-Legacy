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
import useHextechAutomation from '@/composables/useHextechAutomation';

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
import { Loot } from '@/enums/loot';

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
  console.log(app_version);
  console.log(result);

  if (result !== null) {
    if (result.updateInfo.version !== app_version) {
      latestVersion.value = result.updateInfo.version;
      isOldVersion.value = true;
    }
  }
};
const updateToLatest = async () => {
  const path = await window.ipcRenderer.invoke(IChannel.updateToLatest);
  console.log(path);
};
await checkForUpdates();

router.push('/home/all');
const { componentKey, forceRerender } = useComponentKey();

/**
 * Hextech automation function routines
 */
const { autoCraftKeyFragmentsMode } = useSettings();
const {
  refreshLoot,
  disenchantChampionShards,
  disenchantChampionPermanents,
  smartDisenchantChampionLoots,
  openAllMaterialsExcludeChests,
  upgradeChampionShards,
} = useHextechAutomation({
  autoCraftKeyFragmentsMode,
  playerLootMap,
  forceRerender,
  componentKey,
});

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
