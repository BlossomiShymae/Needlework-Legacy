import { computed } from "vue";
import loot from "@/enums/loot";

export default function useHextechStatus(store, lootList) {
  // Check for empty proxy
  if (typeof lootList !== "undefined") {
    const fn = (mutation) => () => {
      lootList.value.forEach((item) => {
        store.commit(mutation, item.disenchantValue);
      });
    };

    const lookupFunctionByCategoryTable = new Map([
      [
        loot.displayCategories.CHAMPION,
        fn("hextechStatus/addDisenchantBlueEssenceTotal"),
      ],
      [
        loot.displayCategories.ETERNALS,
        fn("hextechStatus/addDisenchantOrangeEssenceTotal"),
      ],
      [
        loot.displayCategories.EMOTE,
        fn("hextechStatus/addDisenchantOrangeEssenceTotal"),
      ],
      [
        loot.displayCategories.SKIN,
        fn("hextechStatus/addDisenchantOrangeEssenceTotal"),
      ],
      [
        loot.displayCategories.SUMMONER_ICON,
        fn("hextechStatus/addDisenchantOrangeEssenceTotal"),
      ],
      [
        loot.displayCategories.WARD_SKIN,
        fn("hextechStatus/addDisenchantOrangeEssenceTotal"),
      ],
      [
        loot.displayCategories.COMPANION,
        fn("hextechStatus/addDisenchantOrangeEssenceTotal"),
      ],
    ]);

    // Check for empty proxy array
    if (typeof lootList.value[0] !== "undefined") {
      lookupFunctionByCategoryTable.get(lootList.value[0].displayCategories)();
    }
  }

  return {
    resetHextechStatus: () => {
      store.commit("hextechStatus/resetDisenchantBlueEssenceTotal");
      store.commit("hextechStatus/resetDisenchantOrangeEssenceTotal");
    },
    disenchantBlueEssenceTotal: computed(() => {
      return store.state.hextechStatus.disenchantBlueEssenceTotal;
    }),
    disenchantOrangeEssenceTotal: computed(() => {
      return store.state.hextechStatus.disenchantOrangeEssenceTotal;
    }),
  };
}
