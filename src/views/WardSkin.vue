<template>
  <div class="loot-view-component">
    <h2 class="title2">Ward Skins</h2>
    <w-divider class="fill-width my2"></w-divider>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedWardSkins">
      <BaseLootCard
        v-for="(wardSkin, index) in translatedWardSkins"
        :key="wardSkin"
        :src="src"
        :name="wardSkin.lootName"
        :loot-name="wardSkins[index].lootName"
        :type="wardSkin.type"
        :count="wardSkin.count"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import BaseLootCard from "@/components/BaseLootCard";

export default {
  name: "WardSkin",
  components: {
    BaseLootCard,
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    };
  },
  setup() {
    const store = useStore();

    const { wardSkins } = usePlayerLoot(store);

    const translatedWardSkins = useTranslatedLoot(store, wardSkins);

    return {
      translatedWardSkins,
      wardSkins,
    };
  },
};
</script>

<style>
</style>