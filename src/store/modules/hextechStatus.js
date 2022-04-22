const hextechStatus = {
  namespaced: true,
  state: {
    disenchantBlueEssenceTotal: 0,
    disenchantOrangeEssenceTotal: 0,
  },
  mutations: {
    addDisenchantBlueEssenceTotal(state, value) {
      state.disenchantBlueEssenceTotal += value;
    },
    resetDisenchantBlueEssenceTotal(state) {
      state.disenchantBlueEssenceTotal = 0;
    },
    addDisenchantOrangeEssenceTotal(state, value) {
      state.disenchantOrangeEssenceTotal += value;
    },
    resetDisenchantOrangeEssenceTotal(state) {
      state.disenchantOrangeEssenceTotal = 0;
    },
  },
};

export default hextechStatus;
