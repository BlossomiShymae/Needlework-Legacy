<template>
  <div class="home">
    <WindowButtonBar />
    <div id="left-grid-area">
      <Suspense>
        <SummonerCard
          :current-summoner="currentSummoner"
          :wallet="wallet"
          :key="componentKey"
        />
      </Suspense>
      <div id="loot-button-grid">
        <w-button @click="$router.push('/home/all')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/all.png"
            alt="All loot button"
          />
        </w-button>
        <w-button @click="$router.push('/home/material')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest.png"
            alt="Chest loot button"
          />
        </w-button>
        <w-button @click="$router.push('/home/champion')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/champion.png"
            alt="Champion loot button"
          />
        </w-button>
        <w-button @click="$router.push('/home/skin')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/skin.png"
            alt="Skin loot button"
          />
        </w-button>
        <w-button @click="$router.push('/home/tactician')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/companion.png"
            alt="Companion loot button"
          />
        </w-button>
        <w-button @click="$router.push('/home/eternal')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/eternals.png"
            alt="Eternals loot button"
          />
        </w-button>
        <w-button @click="$router.push('/home/emote')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/emote.png"
            alt="Emote loot button"
          />
        </w-button>
        <w-button @click="$router.push('/home/wardskin')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/wardskin.png"
            alt="Ward skin loot button"
          />
        </w-button>
        <w-button @click="$router.push('/home/icon')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/summonericon.png"
            alt="Summoner loot button"
          />
        </w-button>
      </div>
    </div>
    <div id="right-grid-area">
      <div id="loot-view-router">
        <router-view v-slot="{ Component }">
          <transition name="swap">
            <component :is="Component" />
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
import SummonerCard from "@/components/SummonerCard";
import WindowButtonBar from "@/components/controls/WindowButtonBar";
import store from "@/store/index";
import useSettings from "@/composables/useSettings";
import useComponentKey from "@/composables/useComponentKey";

export default {
  name: "Home",
  components: {
    SummonerCard,
    WindowButtonBar,
  },
  async setup() {
    // Listener for Needlework update event
    onMounted(() => {
      window.ipcRenderer.receive("needlework-update", async () => {
        console.log("Received event update from NeedleworkService.");
        currentSummoner.value = await window.ipcRenderer.invoke(
          "current-summoner"
        );
        wallet.value = await window.ipcRenderer.invoke("wallet");
        forceRerender(componentKey);
      });
    });

    // Init global app state
    const { componentKey, forceRerender } = useComponentKey();
    const sourceState = ref(null);
    sourceState.value = await window.ipcRenderer.invoke("app-get-store");
    const { setStore } = useSettings(store);
    setStore(sourceState);

    const currentSummoner = ref(null);
    const wallet = ref(null);

    currentSummoner.value = await window.ipcRenderer.invoke("current-summoner");
    wallet.value = await window.ipcRenderer.invoke("wallet");

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
      currentSummoner,
      wallet,
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

    button {
      background-color: v-bind("theme.paletteColor[0]");
      padding: 16px;
      border-radius: 0.5rem;
      height: 32px;
      width: 32px;

      box-shadow: 4px 4px 12px grey;
      img {
        image-rendering: -webkit-optimize-contrast;

        height: 16px;
        width: auto;
      }
    }
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
