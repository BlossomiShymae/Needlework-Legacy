<template>
  <div class="loot-view-component">
    <h2 class="title2">Emotes</h2>
    <w-divider class="fill-width my2"></w-divider>
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
import EmoteCard from "@/components/EmoteCard";

export default {
  name: "Emote",
  components: {
    EmoteCard,
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

    return {
      translatedEmotes,
      emotes,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>