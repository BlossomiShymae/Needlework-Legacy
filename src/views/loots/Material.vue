<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Materials</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedChests">
      <ChestCard
        v-for="(chest, index) in translatedChests"
        :key="chest"
        :chest="chest"
        :raw-name="chests[index].lootName"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import ChestCard from "@/components/loots/ChestCard";
import ContentCard from "@/components/ContentCard";

export default {
  name: "Material",
  components: {
    ChestCard,
    ContentCard,
  },
  setup() {
    const store = useStore();

    const { chests } = usePlayerLoot(store);

    const translatedChests = useTranslatedLoot(store, chests);

    console.log(translatedChests.value);

    return {
      translatedChests,
      chests,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>