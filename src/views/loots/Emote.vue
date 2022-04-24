<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Emotes</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedEmotes">
      <EmoteCard
        v-for="emote in translatedEmotes"
        :key="(emote as any)"
        :emote="emote"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EmoteCard from "@/components/loots/EmoteCard.vue";
import ContentCard from "@/components/ContentCard.vue";

export default defineComponent({
  name: "Emote",
  components: {
    EmoteCard,
    ContentCard,
  },
});
</script>

<script setup lang="ts">
import { onBeforeUnmount } from "@vue/runtime-core";

import useHextechStatus from "@/composables/useHextechStatus";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { emotes } = usePlayerLoot();
const translatedEmotes = useTranslatedLoot(emotes);
const { resetHextechStatus } = useHextechStatus(translatedEmotes);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>

<style lang="scss" scoped>
</style>