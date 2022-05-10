<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2 text-bold">Icons</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="sortedIcons">
      <Suspense>
        <BaseLootCard
          v-for="icon in sortedIcons"
          :key="(icon as any)"
          :tileIconPath="icon.tilePath"
          :name="icon.lootName"
          :loot-name="icon.lootNameRaw ?? ''"
          :type="icon.type"
          :count="icon.count"
          :can-open="true"
          :loot="icon"
        />
        <template #fallback>
          <LoadingLootBeeMad />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ContentCard from '@/components/ContentCard.vue';
import BaseLootCard from '@/components/loots/BaseLootCard.vue';
import LoadingLootBeeMad from '@/components/fallbacks/LoadingLootBeeMad.vue';

export default defineComponent({
  name: 'Icon',
  components: {
    BaseLootCard,
    ContentCard,
    LoadingLootBeeMad,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from '@vue/runtime-core';

import useHextechStatus from '@/composables/useHextechStatus';
import usePlayerLoot from '@/composables/usePlayerLoot';
import useSortedLoot from '@/composables/useSortedLoot';
import useTranslatedLoot from '@/composables/useTranslatedLoot';

const { icons } = usePlayerLoot();
const translatedIcons = useTranslatedLoot(icons).translatedLoots;
const { sortedIcons } = useSortedLoot(translatedIcons);
const { resetHextechStatus } = useHextechStatus(sortedIcons);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>
