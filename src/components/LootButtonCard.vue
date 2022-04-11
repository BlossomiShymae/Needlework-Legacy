<template>
  <div id="loot-button-card" :key="componentKey">
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
</template>

<script>
export default {
  name: "LootButtonCard",
};
</script>

<script setup>
import { useStore } from "vuex";
import useSettings from "@/composables/useSettings";

const store = useStore();
const { theme } = useSettings(store);
</script>

<style lang="scss" scoped>
#loot-button-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: v-bind("theme.paletteColor[0]");
    padding: 16px;
    border-radius: 0.5rem;
    height: 32px;
    width: 32px;

    img {
      image-rendering: -webkit-optimize-contrast;

      height: 16px;
      width: auto;
    }
  }
}
</style>