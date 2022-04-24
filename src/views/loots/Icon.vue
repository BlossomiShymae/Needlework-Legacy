<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Icons</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedIcons">
      <Suspense>
        <BaseLootCard
          v-for="(icon, index) in translatedIcons"
          :key="(icon as any)"
          :tileIconPath="icon.tilePath"
          :name="icon.lootName"
          :loot-name="icons[index].lootName"
          :type="icon.type"
          :count="icon.count"
          :can-open="true"
        />
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ContentCard from "@/components/ContentCard.vue";
import BaseLootCard from "@/components/loots/BaseLootCard.vue";

export default defineComponent({
  name: "Icon",
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

const { icons } = usePlayerLoot();
const translatedIcons = useTranslatedLoot(icons);
const { resetHextechStatus } = useHextechStatus(translatedIcons);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>