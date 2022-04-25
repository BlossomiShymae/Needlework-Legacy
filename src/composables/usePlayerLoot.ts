import { useLootStore } from "@/stores/loot";
import { computed } from "vue";

export default function usePlayerLoot() {
  const store = useLootStore();
  return {
    chests: computed(() => store.lootChests),
    champions: computed(() => store.lootChampions),
    eternals: computed(() => store.lootEternals),
    emotes: computed(() => store.lootEmotes),
    skins: computed(() => store.lootSkins),
    icons: computed(() => store.lootIcons),
    wardSkins: computed(() => store.lootWardSkins),
    tacticians: computed(() => store.lootTacticians),
    others: computed(() => store.lootOthers),
    uncategorized: computed(() => store.lootUncategorized),
    orangeEssence: computed(() => store.orangeEssence),
    mythicEssence: computed(() => store.mythicEssence),
    keys: computed(() => store.keys),
  };
}
