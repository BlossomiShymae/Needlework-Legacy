import { computed } from "vue";

export default function usePlayerLoot(store) {
  return {
    chests: computed(() => store.getters.lootChests),
    champions: computed(() => store.getters.lootChampions),
    eternals: computed(() => store.getters.lootEternals),
    emotes: computed(() => store.getters.lootEmotes),
    skins: computed(() => store.getters.lootSkins),
    icons: computed(() => store.getters.lootIcons),
    wardSkins: computed(() => store.getters.lootWardSkins),
    tacticians: computed(() => store.getters.lootTacticians),
    orangeEssence: computed(() => store.getters.orangeEssence),
    mythicEssence: computed(() => store.getters.mythicEssence),
    keys: computed(() => store.getters.keys),
  };
}
