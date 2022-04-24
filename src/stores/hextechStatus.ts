import { defineStore } from "pinia";

interface State {
  disenchantBlueEssenceTotal: number,
  disenchantOrangeEssenceTotal: number,
}

export const useHextechStatusStore = defineStore("hextechStatus", {
  state: (): State => ({
    disenchantBlueEssenceTotal: 0,
    disenchantOrangeEssenceTotal: 0,
  }),
  actions: {
    addDisenchantBlueEssenceTotal (value: number) {
      this.disenchantBlueEssenceTotal += value;
    },
    resetDisenchantBlueEssenceTotal () {
      this.disenchantBlueEssenceTotal = 0;
    },
    addDisenchantOrangeEssenceTotal (value: number) {
      this.disenchantOrangeEssenceTotal += value;
    },
    resetDisenchantOrangeEssenceTotal () {
      this.disenchantOrangeEssenceTotal = 0;
    }
  }
})