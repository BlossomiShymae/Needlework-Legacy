<template>
  <div class="loot-view-component">
    <ContentCard><h2 class="title2 text-bold">Eternals</h2></ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="sortedEternals">
      <EternalCard
        v-for="eternal in sortedEternals"
        :key="(eternal as any)"
        :eternal="eternal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ContentCard from "@/components/ContentCard.vue";
import EternalCard from "@/components/loots/EternalCard.vue";

export default defineComponent({
  name: "Eternal",
  components: {
    EternalCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from "@vue/runtime-core";

import useHextechStatus from "@/composables/useHextechStatus";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useSortedLoot from "@/composables/useSortedLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { eternals } = usePlayerLoot();
const translatedEternals = useTranslatedLoot(eternals).translatedLoots;
const { sortedEternals } = useSortedLoot(translatedEternals);
const { resetHextechStatus } = useHextechStatus(sortedEternals);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>
