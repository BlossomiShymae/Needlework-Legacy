<template>
  <div id="champion" class="ml4">
    <h2 class="title2">Champions</h2>
    <w-divider class="fill-width my2" />
    <div class="loot-grid" v-if="translatedChampions">
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
import ChampionCard from "@/components/ChampionCard";
import { onUnmounted } from "@vue/runtime-core";

export default {
  name: "Champion",
  components: {
    ChampionCard,
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