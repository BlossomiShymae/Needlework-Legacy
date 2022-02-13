import { computed } from "vue";

export default function usePlayerLoot(store) {
  return {
    chests: computed(() => store.getters.lootChests),
    champions: computed(() => store.getters.lootChampions),
    eternals: computed(() => store.getters.lootEternals),
    emotes: computed(() => store.getters.lootEmotes),
  };
}
