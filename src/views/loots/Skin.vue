<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2 text-bold">Skins</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="sortedSkins">
      <SkinCard v-for="skin in sortedSkins" :key="(skin as any)" :skin="skin" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ContentCard from '@/components/ContentCard.vue';
import SkinCard from '@/components/loots/SkinCard.vue';

export default defineComponent({
  name: 'Skin',
  components: {
    SkinCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';

import useHextechStatus from '@/composables/useHextechStatus';
import usePlayerLoot from '@/composables/usePlayerLoot';
import useSortedLoot from '@/composables/useSortedLoot';
import useTranslatedLoot from '@/composables/useTranslatedLoot';

const { skins } = usePlayerLoot();
const translatedSkins = useTranslatedLoot(skins).translatedLoots;
const { sortedSkins } = useSortedLoot(translatedSkins);
const { resetHextechStatus } = useHextechStatus(sortedSkins);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>
>
