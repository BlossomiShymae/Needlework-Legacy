<template>
  <div id="loot-button-card">
    <w-button @click="$router.push('/home/all')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/all.png"
        alt="All loot button"
      />
    </w-button>
    <w-button @click="$router.push('/home/material')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/chest.png"
        alt="Chest loot button"
      />
    </w-button>
    <w-button @click="$router.push('/home/champion')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/champion.png"
        alt="Champion loot button"
      />
    </w-button>
    <w-button @click="$router.push('/home/skin')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/skin.png"
        alt="Skin loot button"
      />
    </w-button>
    <w-button @click="$router.push('/home/tactician')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/companion.png"
        alt="Companion loot button"
      />
    </w-button>
    <w-button @click="$router.push('/home/eternal')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/eternals.png"
        alt="Eternals loot button"
      />
    </w-button>
    <w-button @click="$router.push('/home/emote')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/emote.png"
        alt="Emote loot button"
      />
    </w-button>
    <w-button @click="$router.push('/home/wardskin')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/wardskin.png"
        alt="Ward skin loot button"
      />
    </w-button>
    <w-button @click="$router.push('/home/icon')">
      <img
        src="@/assets/riot_static/rcp-fe-lol-loot/summonericon.png"
        alt="Summoner loot button"
      />
    </w-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LootButtonCard',
});
</script>

<script setup lang="ts">
import useSettings from '@/composables/useSettings';

const { theme } = useSettings();
</script>

<style lang="scss" scoped>
#loot-button-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: v-bind('theme.paletteColor[0]');
    padding: 16px;
    border-radius: 0.5rem;
    height: 32px;
    width: 32px;

    img {
      image-rendering: -webkit-optimize-contrast;
      filter: grayscale(1);

      height: 16px;
      width: auto;
    }
  }
}
</style>
