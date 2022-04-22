import { createStore } from "vuex";
import settings from "./modules/settings";
import hextechStatus from "./modules/hextechStatus";
import createIpcRendererPlugin from "./plugins/createIpcRendererPlugin";
import loot from "@/enums/loot";

const filterMapByCategory = (playerLootMap, category) => {
  const array = Array.from(playerLootMap.values());
  return array.filter((loot) => loot.displayCategories === category);
};

export default createStore({
  state() {
    return {
      playerLootMap: new Map(),
      beSum: {
        disenchant: null,
        upgrade: null,
      },
      lootTable: {},
    };
  },
  getters: {
    championCapsules(state) {
      return state.playerLootMap.get("CHEST_128");
    },
    gloriousChampionCapsules(state) {
      return state.playerLootMap.get("CHEST_129");
    },
    lootChampions(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.CHAMPION
      );
    },
    lootEternals(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.ETERNALS
      );
    },
    lootChests(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.CHEST
      );
    },
    lootEmotes(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.EMOTE
      );
    },
    lootSkins(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.SKIN
      );
    },
    lootIcons(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.SUMMONER_ICON
      );
    },
    lootWardSkins(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.WARD_SKIN
      );
    },
    lootTacticians(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.COMPANION
      );
    },
    lootOthers(state) {
      return filterMapByCategory(
        state.playerLootMap,
        loot.displayCategories.OTHER
      );
    },
    beSum(state) {
      return state.beSum;
    },
    lootTable(state) {
      return state.lootTable;
    },
    orangeEssence(state) {
      return state.playerLootMap.get("CURRENCY_cosmetic");
    },
    mythicEssence(state) {
      return state.playerLootMap.get("CURRENCY_mythic");
    },
    keys(state) {
      return state.playerLootMap.get("MATERIAL_key");
    },
  },
  mutations: {
    update(state, jsonMap) {
      const entries = Object.entries(jsonMap);
      state.playerLootMap = new Map(entries);
    },
    setBalance(state, object) {
      state.beSum = object;
    },
    setLootTable(state, object) {
      state.lootTable = object;
    },
  },
  actions: {},
  modules: {
    settings,
    hextechStatus,
  },
  plugins: [createIpcRendererPlugin],
});
