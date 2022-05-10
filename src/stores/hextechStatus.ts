import { defineStore } from 'pinia';

interface State {
  disenchantBlueEssenceTotal: number;
  disenchantOrangeEssenceTotal: number;
  updateLootCountersFn: () => void;
}

export const useHextechStatusStore = defineStore('hextechStatus', {
  state: (): State => ({
    disenchantBlueEssenceTotal: 0,
    disenchantOrangeEssenceTotal: 0,
    updateLootCountersFn: () => {},
  }),
  actions: {
    addDisenchantBlueEssenceTotal(value: number) {
      this.disenchantBlueEssenceTotal += value;
    },
    resetDisenchantBlueEssenceTotal() {
      this.disenchantBlueEssenceTotal = 0;
    },
    addDisenchantOrangeEssenceTotal(value: number) {
      this.disenchantOrangeEssenceTotal += value;
    },
    resetDisenchantOrangeEssenceTotal() {
      this.disenchantOrangeEssenceTotal = 0;
    },
    setUpdateLootCountersFn(fn: () => void) {
      this.updateLootCountersFn = fn;
    },
    updateLootCounters() {
      this.updateLootCountersFn();
    },
  },
});
