<template>
  <div class="home">
    <div id="left-grid-area">
      <Suspense>
        <SummonerCard :current-summoner="currentSummoner" :wallet="wallet" />
      </Suspense>
      <div id="loot-button-grid">
        <w-button @click="$router.push('/home/material')">
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/all.png"
            alt="All loot button"
          />
        </w-button>
        <w-button>
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest.png"
            alt="Chest loot button"
          />
        </w-button>
        <w-button>
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/champion.png"
            alt="Champion loot button"
          />
        </w-button>
        <w-button>
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/skin.png"
            alt="Skin loot button"
          />
        </w-button>
        <w-button>
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/companion.png"
            alt="Companion loot button"
          />
        </w-button>
        <w-button>
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/eternals.png"
            alt="Eternals loot button"
          />
        </w-button>
        <w-button>
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/emote.png"
            alt="Emote loot button"
          />
        </w-button>
        <w-button>
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/wardskin.png"
            alt="Ward skin loot button"
          />
        </w-button>
        <w-button>
          <img
            src="local-resource://./src/assets/riot_static/rcp-fe-lol-loot/summonericon.png"
            alt="Summoner loot button"
          />
        </w-button>
      </div>
    </div>
    <div id="right-grid-area">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import SummonerCard from "@/components/SummonerCard";

export default {
  name: "Home",
  components: {
    SummonerCard,
  },
  async setup() {
    const currentSummoner = ref(null);
    const wallet = ref(null);

    currentSummoner.value = await window.ipcRenderer.invoke("current-summoner");
    wallet.value = await window.ipcRenderer.invoke("wallet");

    return {
      currentSummoner,
      wallet,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 1px;
  height: calc(100vh - 2px);

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

  #loot-button-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    column-gap: 16px;
    row-gap: 16px;

    margin-top: 32px;

    button {
      background-color: $app-palette-color1;
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
    background-color: $app-frame-color;
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
