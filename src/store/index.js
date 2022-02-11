import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      playerLootMap: new Map(),
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
      const array = Array.from(state.playerLootMap.values());
      return array.filter((loot) => loot.displayCategories === "CHAMPION");
    },
    lootEternals(state) {
      const array = Array.from(state.playerLootMap.values());
      return array.filter((loot) => loot.displayCategories === "ETERNALS");
    },
  },
  mutations: {
    update(state, jsonMap) {
      const entries = Object.entries(jsonMap);
      state.playerLootMap = new Map(entries);
    },
  },
  actions: {},
  modules: {},
});
