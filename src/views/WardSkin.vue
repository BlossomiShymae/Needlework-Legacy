<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Ward Skins</h2> </ContentCard>
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
import ContentCard from "@/components/ContentCard";

export default {
  name: "WardSkin",
  components: {
    BaseLootCard,
    ContentCard,
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