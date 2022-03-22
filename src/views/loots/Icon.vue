<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Icons</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedIcons">
      <Suspense>
        <BaseLootCard
          v-for="(icon, index) in translatedIcons"
          :key="icon"
          :tileIconPath="icon.tilePath"
          :name="icon.lootName"
          :loot-name="icons[index].lootName"
          :type="icon.type"
          :count="icon.count"
        />
      </Suspense>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import BaseLootCard from "@/components/loots/BaseLootCard";
import ContentCard from "@/components/ContentCard";

export default {
  name: "Icon",
  components: {
    BaseLootCard,
    ContentCard,
  },
  setup() {
    const store = useStore();

    const { icons } = usePlayerLoot(store);

    const translatedIcons = useTranslatedLoot(store, icons);

    return {
      translatedIcons,
      icons,
    };
  },
};
</script>

<style>
</style>