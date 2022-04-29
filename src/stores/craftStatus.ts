import { defineStore } from "pinia";
import { CraftResponse } from "../types/CraftResponse";

interface State {
  craftedHistory: CraftResponse[];
  isCardExpanded: boolean;
}

export const useCraftStatusStore = defineStore("craftStatus", {
  state: (): State => ({
    craftedHistory: [],
    isCardExpanded: false,
  }),
  actions: {
    addToCraftedHistory(craftResponse: CraftResponse) {
      this.craftedHistory.push(craftResponse);
    },
    setCardExpanded(isCardExpanded: boolean) {
      this.isCardExpanded = isCardExpanded;
    },
  },
});
