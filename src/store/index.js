import { createStore } from "vuex";

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
      return filterMapByCategory(state.playerLootMap, "ICON");
    },
    lootWardSkins(state) {
      return filterMapByCategory(state.playerLootMap, "WARD_SKIN");
    },
    lootTacticians(state) {
      return filterMapByCategory(state.playerLootMap, "COMPANION");
    },
    beSum(state) {
      return state.beSum;
    },
    lootTable(state) {
      return state.lootTable;
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
  modules: {},
});
