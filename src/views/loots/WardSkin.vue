<template>
  <div class="loot-view-component">
    <ContentCard> <h2 class="title2">Ward Skins</h2> </ContentCard>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedWardSkins">
      <Suspense>
        <BaseLootCard
          v-for="(wardSkin, index) in translatedWardSkins"
          :key="wardSkin"
          :tileIconPath="wardSkin.tilePath"
          :name="wardSkin.lootName"
          :loot-name="wardSkins[index].lootName"
          :type="wardSkin.type"
          :count="wardSkin.count"
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
import useHextechStatus from "@/composables/useHextechStatus";
import { onBeforeUnmount } from "@vue/runtime-core";

export default {
  name: "WardSkin",
  components: {
    BaseLootCard,
    ContentCard,
  },
  setup() {
    const store = useStore();

    const { wardSkins } = usePlayerLoot(store);

    const translatedWardSkins = useTranslatedLoot(store, wardSkins);

    const { resetHextechStatus } = useHextechStatus(store, translatedWardSkins);

    onBeforeUnmount(() => {
      resetHextechStatus();
    });

    return {
      translatedWardSkins,
      wardSkins,
    };
  },
};
</script>

<style>
</style>