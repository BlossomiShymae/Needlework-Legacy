<template>
  <div class="loot-meta-panel" id="main" v-if="isCardExpanded === false">
    <Suspense>
      <SummonerHorizontalCard />
    </Suspense>
    <Suspense>
      <HextechStatusCard />
    </Suspense>
    <LootButtonCard />
    <CraftedCard />
  </div>

  <div class="loot-meta-panel" id="alternate" v-if="isCardExpanded">
    <CraftedCard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CraftedCard from '@/components/CraftedCard.vue';
import SummonerHorizontalCard from '@/components/SummonerHorizontalCard.vue';
import HextechStatusCard from '@/components/HextechStatusCard.vue';
import LootButtonCard from '@/components/LootButtonCard.vue';

export default defineComponent({
  name: 'LootMetaPanel',
  components: {
    SummonerHorizontalCard,
    HextechStatusCard,
    LootButtonCard,
    CraftedCard,
  },
});
</script>

<script setup lang="ts">
import useCraftStatus from '@/composables/useCraftStatus';
import useSettings from '@/composables/useSettings';

const { isCardExpanded } = useCraftStatus();
const { theme } = useSettings();
</script>

<style lang="scss" scoped>
.loot-meta-panel {
  background-color: v-bind('theme.frameColor');
  overflow: hidden;
  padding: 8px;
}

#main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows:
    minmax(0, 1fr)
    minmax(0, 1fr)
    minmax(min-content, max-content)
    minmax(0, 1fr);
  gap: 8px;
}

#alternate {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(0, 1fr);
  gap: 8px;
}
</style>
