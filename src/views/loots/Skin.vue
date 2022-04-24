<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Skins</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedSkins">
      <SkinCard v-for="skin in translatedSkins" :key="(skin as any)" :skin="skin" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ContentCard from "@/components/ContentCard.vue";
import SkinCard from "@/components/loots/SkinCard.vue";

export default defineComponent({
  name: "Skin",
  components: {
    SkinCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";

import useHextechStatus from "@/composables/useHextechStatus";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { skins } = usePlayerLoot();
const translatedSkins = useTranslatedLoot(skins);
const { resetHextechStatus } = useHextechStatus(translatedSkins);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>>