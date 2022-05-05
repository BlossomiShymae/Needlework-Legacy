import { defineStore } from "pinia";
import type { PlayerLoot } from "@/types/PlayerLoot";
import { Loot } from "@/enums/loot";
import { PlayerLootMap } from "@/types/PlayerLootMap";

interface State {
  playerLootMap: PlayerLootMap;
  lootTable: object;
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
    orangeEssence: (state) => state.playerLootMap.get("CURRENCY_cosmetic"),
    mythicEssence: (state) => state.playerLootMap.get("CURRENCY_mythic"),
    keys: (state) => state.playerLootMap.get("MATERIAL_key"),
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
