<template>
  <div class="home">
    <WindowButtonBar />
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
        <w-button><w-icon>mdi mdi-help-circle-outline</w-icon></w-button>
        <w-menu top min-width="180px">
          <template #activator="{ on }">
            <w-button v-on="on">
              <img
                class="button-icon"
                src="local-resource://./src/assets/riot_static/chest_generic.png"
              />
              <w-icon>mdi mdi-cog-play</w-icon>
              Hextech automation
            </w-button>
          </template>
          test
        </w-menu>
        <w-button @click="refreshLoot()"
          ><w-icon>mdi mdi-refresh</w-icon></w-button
        >
        <div class="flex-divider"></div>
        <w-button><w-icon>mdi mdi-discord</w-icon></w-button>
        <div class="version-info">v0.0</div>
        <w-button><w-icon>mdi mdi-github</w-icon></w-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LootMetaPanel from "@/components/panels/LootMetaPanel.vue";
import SummonerCard from "@/components/SummonerCard.vue";
import WindowButtonBar from "@/components/controls/WindowButtonBar.vue";

export default defineComponent({
  name: "Home",
  components: {
    SummonerCard,
    WindowButtonBar,
    LootMetaPanel,
  },
});
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/router";
import Time from "@/utils/Time";
import routes from "@/apis/needlework/src/data/routes";
import { IChannel, RChannel } from "@/channels";

import useComponentKey from "@/composables/useComponentKey";
import { useLootStore } from "@/stores/loot";
import useSettings from "@/composables/useSettings";
import { useHextechStatusStore } from "@/stores/hextechStatus";

// Initialize global application state for settings
async function setupSettingsState() {
  const settingsState: any = await window.ipcRenderer.invoke(IChannel.getStore);
  const { setStore, getStore } = useSettings();
  if (typeof settingsState !== "undefined") {
    const state = getStore() as any;
    for (const key in state) {
      if (Object.prototype.hasOwnProperty.call(settingsState, key)) {
        if (
          typeof settingsState[key] !== "undefined" &&
          settingsState[key] !== null
        ) {
          state[key] = settingsState[key];
        }
      }
    }
    setStore(state);
  }
}
await setupSettingsState();

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

router.push("/home/all");
const { componentKey, forceRerender } = useComponentKey();
const hextechStore = useHextechStatusStore();

const refreshLoot = async () => {
  playerLootMap.value = await window.ipcRenderer.invoke(IChannel.playerLootMap);
  lootStore.updatePlayerLootMap(playerLootMap.value);
  hextechStore.updateLootCounters();
  forceRerender(componentKey);
};

onMounted(() => {
  window.ipcRenderer.receive(RChannel.needleworkUpdate, async (uri: any) => {
    if (uri === routes.PLAYER_LOOT_MAP) {
      console.log(
        "Received event update from NeedleworkService - " +
          uri +
          " " +
          Time.toString()
      );
      await refreshLoot();
    }
  });
});
</script>

<style lang="scss" scoped>
.home {
  // Where is the magic number of 7px coming from? ?.?
  // 88.8889% is determined from 8fr 1fr #right-grid-area.
  background-color: inherit;
  --swap-height: calc(88.8889% - 7px);
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
}

#loot-view-router {
  overflow-y: scroll;
  padding-left: 8px;
}

.home {
  height: 100vh;
  background-color: v-bind("theme.backgroundColor");

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
    color: v-bind("theme.textColor");
    padding-left: 8px;
    padding-right: 8px;

    &:deep(.w-button) {
      color: white;
      background-color: v-bind("theme.paletteColor[0]");
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
