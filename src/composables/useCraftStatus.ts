import { useCraftStatusStore } from "@/stores/craftStatus";
import { computed } from "@vue/reactivity";

export default function useCraftStatus() {
  const store = useCraftStatusStore();

  const resetCraftStore = () => {
    store.$reset();
  };

  return {
    craftHistory: computed(() => store.craftedHistory),
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
  };
}
