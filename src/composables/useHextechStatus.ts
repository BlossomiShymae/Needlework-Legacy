import { Ref, computed } from 'vue';
import { Loot } from '@/enums/loot';
import { useHextechStatusStore } from '../stores/hextechStatus';
import { PlayerLoot } from '@/types/PlayerLoot';

export default function useHextechStatus(lootList?: Ref<PlayerLoot[]>) {
  const store = useHextechStatusStore();
  // Check for empty proxy
  if (typeof lootList !== 'undefined') {
    const fn = (actionFunction: Function) => () => {
      lootList.value.forEach((item) => {
        actionFunction(item?.disenchantValue);
      });
    };

    const lookupFunctionByCategoryTable = new Map([
      [
        Loot.DisplayCategories.CHAMPION,
        fn(store.addDisenchantBlueEssenceTotal),
      ],
      [
        Loot.DisplayCategories.ETERNALS,
        fn(store.addDisenchantOrangeEssenceTotal),
      ],
      [Loot.DisplayCategories.EMOTE, fn(store.addDisenchantOrangeEssenceTotal)],
      [Loot.DisplayCategories.SKIN, fn(store.addDisenchantOrangeEssenceTotal)],
      [
        Loot.DisplayCategories.SUMMONER_ICON,
        fn(store.addDisenchantOrangeEssenceTotal),
      ],
      [
        Loot.DisplayCategories.WARD_SKIN,
        fn(store.addDisenchantOrangeEssenceTotal),
      ],
      [
        Loot.DisplayCategories.COMPANION,
        fn(store.addDisenchantOrangeEssenceTotal),
      ],
    ]);

    // Check for empty proxy array
    if (typeof lootList.value[0] !== 'undefined') {
      lookupFunctionByCategoryTable.get(
        lootList.value[0].displayCategories as Loot.DisplayCategories
      )?.();
    }
  }

  return {
    resetHextechStatus: () => {
      store.resetDisenchantBlueEssenceTotal();
      store.resetDisenchantOrangeEssenceTotal();
    },
    disenchantBlueEssenceTotal: computed(() => {
      return store.disenchantBlueEssenceTotal;
    }),
    disenchantOrangeEssenceTotal: computed(() => {
      return store.disenchantOrangeEssenceTotal;
    }),
  };
}
