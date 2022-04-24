<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Ward Skins</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedWardSkins">
      <Suspense>
        <BaseLootCard
          v-for="(wardSkin, index) in translatedWardSkins"
          :key="(wardSkin as any)"
          :tileIconPath="wardSkin.tilePath"
          :name="wardSkin.lootName"
          :loot-name="wardSkins[index].lootName"
          :type="wardSkin.type"
          :count="wardSkin.count"
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
  name: "WardSkin",
  components: {
    BaseLootCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from "@vue/runtime-core";

import useHextechStatus from "@/composables/useHextechStatus";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { wardSkins } = usePlayerLoot();
const translatedWardSkins = useTranslatedLoot(wardSkins);
const { resetHextechStatus } = useHextechStatus(translatedWardSkins);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>