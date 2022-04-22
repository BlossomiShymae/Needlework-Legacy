<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Emotes</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedEmotes">
      <EmoteCard
        v-for="emote in translatedEmotes"
        :key="emote"
        :emote="emote"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import EmoteCard from "@/components/loots/EmoteCard";
import ContentCard from "@/components/ContentCard";
import useHextechStatus from "@/composables/useHextechStatus";
import { onBeforeUnmount } from "@vue/runtime-core";

export default {
  name: "Emote",
  components: {
    EmoteCard,
    ContentCard,
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    };
  },
  setup() {
    const store = useStore();

    const { emotes } = usePlayerLoot(store);

    const translatedEmotes = useTranslatedLoot(store, emotes);

    const { resetHextechStatus } = useHextechStatus(store, translatedEmotes);

    onBeforeUnmount(() => {
      resetHextechStatus();
    });

    return {
      translatedEmotes,
      emotes,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>