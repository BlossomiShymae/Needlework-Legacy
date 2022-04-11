import { createStore } from "vuex";
import settings from "./modules/settings";
import createIpcRendererPlugin from "./plugins/createIpcRendererPlugin";

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
      return filterMapByCategory(state.playerLootMap, "CHAMPION");
    },
    lootEternals(state) {
      return filterMapByCategory(state.playerLootMap, "ETERNALS");
    },
    lootChests(state) {
      return filterMapByCategory(state.playerLootMap, "CHEST");
    },
    lootEmotes(state) {
      return filterMapByCategory(state.playerLootMap, "EMOTE");
    },
    lootSkins(state) {
      return filterMapByCategory(state.playerLootMap, "SKIN");
    },
    lootIcons(state) {
      return filterMapByCategory(state.playerLootMap, "SUMMONERICON");
    },
    lootWardSkins(state) {
      return filterMapByCategory(state.playerLootMap, "WARDSKIN");
    },
    lootTacticians(state) {
      return filterMapByCategory(state.playerLootMap, "COMPANION");
    },
    lootOthers(state) {
      return filterMapByCategory(state.playerLootMap, "OTHER");
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
    settings: settings,
  },
  plugins: [createIpcRendererPlugin],
});
