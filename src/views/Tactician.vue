<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Tacticians</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedTacticians">
      <Suspense>
        <BaseLootCard
          v-for="(tactician, index) in translatedTacticians"
          :key="tactician"
          :tileIconPath="tactician.tilePath"
          :name="tactician.lootName"
          :loot-name="tacticians[index].lootName"
          :type="tactician.type"
          :count="tactician.count"
        />
      </Suspense>
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
  name: "Tactician",
  components: {
    BaseLootCard,
    ContentCard,
  },
  setup() {
    const store = useStore();

    const { tacticians } = usePlayerLoot(store);

    const translatedTacticians = useTranslatedLoot(store, tacticians);

    return {
      translatedTacticians,
      tacticians,
    };
  },
};
</script>

<style>
</style>