<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Tacticians</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="sortedTacticians">
      <Suspense>
        <BaseLootCard
          v-for="tactician in sortedTacticians"
          :key="(tactician as any)"
          :tileIconPath="tactician.tilePath"
          :name="tactician.lootName"
          :loot-name="tactician.lootNameRaw ?? ''"
          :type="tactician.type"
          :count="tactician.count"
          :can-open="true"
          :loot="tactician"
        />
        <template #fallback>
          <LoadingLootBeeMad />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseLootCard from "@/components/loots/BaseLootCard.vue";
import ContentCard from "@/components/ContentCard.vue";
import LoadingLootBeeMad from "@/components/fallbacks/LoadingLootBeeMad.vue";

export default defineComponent({
  name: "Tactician",
  components: {
    BaseLootCard,
    ContentCard,
    LoadingLootBeeMad,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from "@vue/runtime-core";

import useHextechStatus from "@/composables/useHextechStatus";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useSortedLoot from "@/composables/useSortedLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { tacticians } = usePlayerLoot();
const translatedTacticians = useTranslatedLoot(tacticians).translatedLoots;
const { sortedTacticians } = useSortedLoot(translatedTacticians);
const { resetHextechStatus } = useHextechStatus(sortedTacticians);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>
