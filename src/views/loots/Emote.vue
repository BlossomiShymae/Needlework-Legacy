<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2 text-bold">Emotes</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="sortedEmotes">
      <EmoteCard
        v-for="emote in sortedEmotes"
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
import useSortedLoot from "@/composables/useSortedLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

const { emotes } = usePlayerLoot();
const translatedEmotes = useTranslatedLoot(emotes).translatedLoots;
const { sortedEmotes } = useSortedLoot(translatedEmotes);
const { resetHextechStatus } = useHextechStatus(sortedEmotes);

onBeforeUnmount(() => {
  resetHextechStatus();
});
</script>

<style lang="scss" scoped></style>
