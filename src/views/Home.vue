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

<script>
import { ref, onMounted } from "vue";
import router from "@/router/index.js";
import LootMetaPanel from "@/components/panels/LootMetaPanel";
import SummonerCard from "@/components/SummonerCard";
import WindowButtonBar from "@/components/controls/WindowButtonBar";
import store from "@/store/index";
import useSettings from "@/composables/useSettings";
import useComponentKey from "@/composables/useComponentKey";
import Time from "@/utils/Time";
import routes from "@/apis/needlework/src/data/routes";

export default {
  name: "Home",
  components: {
    SummonerCard,
    WindowButtonBar,
    LootMetaPanel,
  },
  async setup() {
    // Listener for Needlework update event
    onMounted(() => {
      window.ipcRenderer.receive("needlework-update", async (uri) => {
        if (uri === routes.PLAYER_LOOT_MAP) {
          console.log(
            "Received event update from NeedleworkService - " +
              uri +
              " " +
              Time.toString()
          );
          playerLootMapObject.value = await window.ipcRenderer.invoke(
            "player-loot-map"
          );
          store.commit("update", playerLootMapObject.value);
          forceRerender(componentKey);
        }
      });
    });

    // Init global app state
    const { componentKey, forceRerender } = useComponentKey();
    const sourceState = ref(null);
    sourceState.value = await window.ipcRenderer.invoke("app-get-store");
    const { setStore } = useSettings(store);
    setStore(sourceState);

    const playerLootMapObject = ref({});
    playerLootMapObject.value = await window.ipcRenderer.invoke(
      "player-loot-map"
    );

    const updatePlayerLootMap = store.commit(
      "update",
      playerLootMapObject.value
    );

    const lootTable = ref(null);
    lootTable.value = await window.ipcRenderer.invoke("cd-loot-translation");
    store.commit("setLootTable", lootTable.value);

    // Theme
    const { theme } = useSettings(store);

    router.push("/home/all");

    return {
      updatePlayerLootMap,
      theme,
      componentKey,
      forceRerender,
    };
  },
};
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
