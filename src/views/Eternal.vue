<template>
  <div class="loot-view-component">
    <ContentCard><h2 class="title2">Eternals</h2></ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedEternals">
      <EternalCard
        v-for="eternal in translatedEternals"
        :key="eternal"
        :eternal="eternal"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import EternalCard from "@/components/EternalCard";
import ContentCard from '@/components/ContentCard';

export default {
  name: "Eternal",
  components: {
    EternalCard,
    ContentCard
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    };
  },
  setup() {
    const store = useStore();

    const { eternals } = usePlayerLoot(store);

    const translatedEternals = useTranslatedLoot(store, eternals);

    return {
      translatedEternals,
      eternals,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>