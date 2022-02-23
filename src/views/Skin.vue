<template>
  <div class="loot-view-component">
    <h2 class="title2">Skins</h2>
    <w-divider class="fill-width my2"></w-divider>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedSkins">
      <SkinCard v-for="skin in translatedSkins" :key="skin" :skin="skin" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import SkinCard from "@/components/SkinCard";

export default {
  name: "Skin",
  components: {
    SkinCard,
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    };
  },
  setup() {
    const store = useStore();

    const { skins } = usePlayerLoot(store);

    const translatedSkins = useTranslatedLoot(store, skins);

    return {
      translatedSkins,
      skins,
    };
  },
};
</script>

<style>
</style>