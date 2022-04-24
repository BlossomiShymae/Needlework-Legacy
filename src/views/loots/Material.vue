<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Materials</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedChests">
      <ChestCard
        v-for="(chest, index) in translatedChests"
        :key="(chest as any)"
        :chest="chest"
        :raw-name="chests[index].lootName"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ChestCard from "@/components/loots/ChestCard.vue";
import ContentCard from "@/components/ContentCard.vue";

export default defineComponent({
  name: "Material",
  components: {
    ChestCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { chests } = usePlayerLoot();
const translatedChests = useTranslatedLoot(chests);
</script>