<template>
  <div class="loot-view-component">
    <h2 class="title2">Tacticians</h2>
    <w-divider class="fill-width my2"></w-divider>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedTacticians">
      <BaseLootCard
      v-for="(tactician, index) in translatedTacticians"
      :key="tactician"
      :src="src"
      :name="tactician.lootName"
      :loot-name="tacticians[index].lootName"
      :type="tactician.type"
      :count="tactician.count"
       />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import BaseLootCard from "@/components/BaseLootCard";

export default {
  name: "Tactician",
  components: {
    BaseLootCard,
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    };
  },
  setup() {
    const store = useStore();

    const { tacticians } = usePlayerLoot(store);

    const translatedTacticians = useTranslatedLoot(store, tacticians);

    return {
      translatedTacticians,
      tacticians,
    };
  },
};
</script>

<style>
</style>