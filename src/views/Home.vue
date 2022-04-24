<template>
  <div class="home">
    <WindowButtonBar />
    <LootMetaPanel />
    <div id="right-grid-area">
      <div id="loot-view-router">
        <router-view v-slot="{ Component }">
          <transition name="swap">
            <component :is="Component" :key="componentKey" />
          </transition>
        </router-view>
      </div>
      <div id="flex-controls">
        <w-button> Disenchant all </w-button>
        <w-button> Disenchant </w-button>
      </div>
      <img
        id="doodle"
        src="local-resource://./src/assets/gwen_doll_doodle.png"
      />
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

import useComponentKey from "@/composables/useComponentKey";
import { useLootStore } from '@/stores/loot';
import useSettings from "@/composables/useSettings";

// Initialize global application state for settings
const settingsState: any = await window.ipcRenderer.invoke("app-get-store");
const { setStore } = useSettings();
setStore(settingsState);

// Initalize PlayerLoot and it's store
const playerLootMap = ref({});
playerLootMap.value = await window.ipcRenderer.invoke("player-loot-map");
const lootStore = useLootStore();
lootStore.updatePlayerLootMap(playerLootMap.value);

// Initialize loot table for loot translations
const lootTable = ref({});
lootTable.value = await window.ipcRenderer.invoke("cd-loot-translation");
lootStore.setLootTable(lootTable.value);

const { theme } = useSettings();

router.push("/home/all");
const { componentKey, forceRerender } = useComponentKey();

onMounted(() => {
  window.ipcRenderer.receive("needlework-update", async (uri: any) => {
    if (uri === routes.PLAYER_LOOT_MAP) {
      console.log("Received event update from NeedleworkService - " + 
      uri + " " + Time.toString());
      playerLootMap.value = await window.ipcRenderer.invoke("player-loot-map");
      lootStore.updatePlayerLootMap(playerLootMap.value);
      forceRerender(componentKey);
    }
  })
})
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
    grid-template-rows: 8fr 1fr;
    padding-top: 20px;
    row-gap: 10px;
    overflow: hidden;

    #doodle {
      position: absolute;
      right: calc(0px - 2px);
      bottom: calc(0px - 16px);
      filter: opacity(0.08) drop-shadow(0 0 0px v-bind("theme.paletteColor[1]"));
    }
  }

  #flex-controls {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & * {
      background-color: v-bind("theme.paletteColor[0]");
      margin-left: 20px;
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

  div {
    background-color: v-bind("theme.frameColor");
    color: black;
  }

  button {
    img {
      height: 20px;
      width: auto;
      filter: grayscale(1);
    }
  }
}
</style>
