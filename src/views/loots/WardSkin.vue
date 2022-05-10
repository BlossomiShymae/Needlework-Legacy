<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2 text-bold">Ward Skins</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="sortedWardSkins">
      <Suspense>
        <BaseLootCard
          v-for="wardSkin in sortedWardSkins"
          :key="(wardSkin as any)"
          :tileIconPath="wardSkin.tilePath"
          :name="wardSkin.lootName"
          :loot-name="wardSkin.lootNameRaw ?? ''"
          :type="wardSkin.type"
          :count="wardSkin.count"
          :can-open="true"
          :loot="wardSkin"
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
  name: 'WardSkin',
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

const { wardSkins } = usePlayerLoot();
const translatedWardSkins = useTranslatedLoot(wardSkins).translatedLoots;
const { sortedWardSkins } = useSortedLoot(translatedWardSkins);
const { resetHextechStatus } = useHextechStatus(sortedWardSkins);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>
