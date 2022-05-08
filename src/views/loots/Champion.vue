<template>
  <div class="loot-view-component">
    <ContentCard><h2 class="title2 text-bold">Champions</h2></ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="sortedChampions">
      <ChampionCard
        v-for="champion in sortedChampions"
        :key="(champion as any)"
        :champion="champion"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ChampionCard from "@/components/loots/ChampionCard.vue";
import ContentCard from "@/components/ContentCard.vue";

export default defineComponent({
  name: "Champion",
  components: {
    ChampionCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from "@vue/runtime-core";

import useHextechStatus from "@/composables/useHextechStatus";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useSortedLoot from "../../composables/useSortedLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { champions } = usePlayerLoot();
const translatedChampions = useTranslatedLoot(champions).translatedLoots;
const { sortedChampions } = useSortedLoot(translatedChampions);
const { resetHextechStatus } = useHextechStatus(sortedChampions);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>

<style lang="scss" scoped>
#champion {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
}
</style>
