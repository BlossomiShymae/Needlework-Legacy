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
    beSum(state) {
      return state.beSum;
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
  },
  actions: {},
  modules: {},
});
