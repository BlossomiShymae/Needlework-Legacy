import { defineStore } from "pinia";
import type { PlayerLoot } from "@/types/PlayerLoot";
import { Loot } from "@/enums/loot";
import { PlayerLootMap } from "@/types/PlayerLootMap";
import { Mutex } from "async-mutex";

interface State {
  playerLootMap: PlayerLootMap;
  lootTable: object;
  mutex: Mutex;
}

function filterMapByCategory(
  playerLootMap: PlayerLootMap,
  category: string
): PlayerLoot[] {
  const array = Array.from(playerLootMap.values()) as PlayerLoot[];
  return array.filter((loot) => loot.displayCategories === category);
}

export const useLootStore = defineStore("loot", {
  state: (): State => ({
    playerLootMap: new Map<string, PlayerLoot>(),
    lootTable: {},
    mutex: new Mutex(),
  }),
  getters: {
    championCapsules: (state) =>
      state.playerLootMap.get(Loot.LootId.CHAMPION_CAPSULE),
    gloriousChampionCapsules: (state) =>
      state.playerLootMap.get(Loot.LootId.GLORIOUS_CHAMPION_CAPSULE),
    gloriousChampionCapsulesMythic: (state) =>
      state.playerLootMap.get(Loot.LootId.GLORIOUS_CHAMPION_CAPSULE_MYTHIC),
    lootChampions: (state) =>
      filterMapByCategory(state.playerLootMap, Loot.DisplayCategories.CHAMPION),
    lootEternals: (state) =>
      filterMapByCategory(state.playerLootMap, Loot.DisplayCategories.ETERNALS),
    lootChests: (state) =>
      filterMapByCategory(state.playerLootMap, Loot.DisplayCategories.CHEST),
    lootEmotes: (state) =>
      filterMapByCategory(state.playerLootMap, Loot.DisplayCategories.EMOTE),
    lootSkins: (state) =>
      filterMapByCategory(state.playerLootMap, Loot.DisplayCategories.SKIN),
    lootIcons: (state) =>
      filterMapByCategory(
        state.playerLootMap,
        Loot.DisplayCategories.SUMMONER_ICON
      ),
    lootWardSkins: (state) =>
      filterMapByCategory(
        state.playerLootMap,
        Loot.DisplayCategories.WARD_SKIN
      ),
    lootTacticians: (state) =>
      filterMapByCategory(
        state.playerLootMap,
        Loot.DisplayCategories.COMPANION
      ),
    lootOthers: (state) =>
      filterMapByCategory(state.playerLootMap, Loot.DisplayCategories.OTHER),
    lootUncategorized: (state) =>
      filterMapByCategory(state.playerLootMap, Loot.DisplayCategories.NONE),
    orangeEssence: (state) =>
      state.playerLootMap.get(Loot.LootId.ORANGE_ESSENCE),
    mythicEssence: (state) =>
      state.playerLootMap.get(Loot.LootId.MYTHIC_ESSENCE),
    keys: (state) => state.playerLootMap.get(Loot.LootId.KEY),
    keyFragments: (state) => state.playerLootMap.get(Loot.LootId.KEY_FRAGMENT),
  },
  actions: {
    updatePlayerLootMap(jsonMap: object) {
      const entries = Object.entries(jsonMap);
      this.playerLootMap = new Map(entries) as PlayerLootMap;
    },
    setLootTable(value: object) {
      this.lootTable = value;
    },
  },
});
