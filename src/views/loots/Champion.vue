<template>
  <div class="loot-view-component">
    <ContentCard><h2 class="title2">Champions</h2></ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedChampions">
      <ChampionCard
        v-for="champion in translatedChampions"
        :key="champion"
        :champion="champion"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import ChampionCard from "@/components/loots/ChampionCard";
import { onUnmounted } from "@vue/runtime-core";
import ContentCard from "@/components/ContentCard";

export default {
  name: "Champion",
  components: {
    ChampionCard,
    ContentCard,
  },
  setup() {
    const store = useStore();

    const { champions } = usePlayerLoot(store);

    if (champions.value.length > 0) {
      const sum = champions.value.reduce((a, b) => {
        return (a.disenchantValue ?? a) + b.disenchantValue;
      });

      store.commit("setBalance", { disenchant: sum, upgrade: null });

      onUnmounted(() => {
        store.commit("setBalance", { disenchant: null, upgrade: null });
      });
    }

    const translatedChampions = useTranslatedLoot(store, champions);

    return {
      translatedChampions,
    };
  },
};
</script>

<style lang="scss" scoped>
#champion {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
}
</style>