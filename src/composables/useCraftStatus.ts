import { useCraftStatusStore } from '@/stores/craftStatus';
import { FlattenCrafted } from '@/types/CraftResponse';
import { computed } from '@vue/reactivity';
import _ from 'lodash';

export default function useCraftStatus() {
  const store = useCraftStatusStore();

  const resetCraftStore = () => {
    store.$reset();
  };

  const craftHistory = computed(() => {
    return store.craftedHistory;
  });

  const flatCraftedHistory = computed(() => {
    let flattedList: FlattenCrafted[] = [];
    craftHistory.value.forEach((crafted) => {
      if (typeof crafted.added !== 'undefined' && crafted.added !== null) {
        flattedList = _.concat(
          flattedList,
          crafted.added.map((crafted) => {
            return {
              ...crafted,
              craftType: 'added',
            };
          })
        );
      }
      if (
        typeof crafted.redeemed !== 'undefined' &&
        crafted.redeemed !== null
      ) {
        flattedList = _.concat(
          flattedList,
          crafted.redeemed.map((crafted) => {
            return {
              ...crafted,
              craftType: 'redeemed',
            };
          })
        );
      }
      if (typeof crafted.removed !== 'undefined' && crafted.removed !== null) {
        flattedList = _.concat(
          flattedList,
          crafted.removed.map((crafted) => {
            return {
              ...crafted,
              craftType: 'removed',
            };
          })
        );
      }
    });
    return flattedList.reverse();
  });

  return {
    craftHistory,
    addToCraftedHistory: store.addToCraftedHistory,
    resetCraftStore,
    isCardExpanded: computed({
      get() {
        return store.isCardExpanded;
      },
      set(isCardExpanded: boolean) {
        store.setCardExpanded(isCardExpanded);
      },
    }),
    flatCraftedHistory,
  };
}
