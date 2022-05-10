<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2 text-bold">Materials</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="sortedChests">
      <ChestCard
        v-for="chest in sortedChests"
        :key="(chest as any)"
        :chest="chest"
        :raw-name="chest.lootNameRaw ?? ''"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ChestCard from '@/components/loots/ChestCard.vue';
import ContentCard from '@/components/ContentCard.vue';

export default defineComponent({
  name: 'Material',
  components: {
    ChestCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import usePlayerLoot from '@/composables/usePlayerLoot';
import useSortedLoot from '@/composables/useSortedLoot';
import useTranslatedLoot from '@/composables/useTranslatedLoot';

const { chests } = usePlayerLoot();
const translatedChests = useTranslatedLoot(chests).translatedLoots;
const { sortedChests } = useSortedLoot(translatedChests);
</script>
