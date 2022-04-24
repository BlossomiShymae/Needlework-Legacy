<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Tacticians</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedTacticians">
      <Suspense>
        <BaseLootCard
          v-for="(tactician, index) in translatedTacticians"
          :key="(tactician as any)"
          :tileIconPath="tactician.tilePath"
          :name="tactician.lootName"
          :loot-name="tacticians[index].lootName"
          :type="tactician.type"
          :count="tactician.count"
          :can-open="true"
        />
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseLootCard from "@/components/loots/BaseLootCard.vue";
import ContentCard from "@/components/ContentCard.vue";

export default defineComponent({
  name: "Tactician",
  components: {
    BaseLootCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from '@vue/runtime-core';

import useHextechStatus from '@/composables/useHextechStatus';
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { tacticians } = usePlayerLoot();
const translatedTacticians = useTranslatedLoot(tacticians);
const { resetHextechStatus } = useHextechStatus(translatedTacticians);

onBeforeUnmount(() => {
  resetHextechStatus();
})
</script>