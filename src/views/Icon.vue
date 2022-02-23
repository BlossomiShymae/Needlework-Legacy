<template>
  <div class="loot-view-component">
    <h2 class="title2">Icons</h2>
    <w-divider class="fill-width my2"></w-divider>
    <div class="loot-dynamic-grid-subcomponent" v-if="translatedIcons">
      <BaseLootCard
      v-for="(icon, index) in translatedIcons"
      :key="icon"
      :src="src"
      :name="icon.lootName"
      :loot-name="icons[index].lootName"
      :type="icon.type"
      :count="icon.count"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from '@/composables/usePlayerLoot';
import useTranslatedLoot from '@/composables/useTranslatedLoot';
import BaseLootCard from '@/components/BaseLootCard';

export default {
  name: "Icon",
  components: {
    BaseLootCard
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    }
  },
  setup() {
    const store = useStore();

    const { icons } = usePlayerLoot(store);

    const translatedIcons = useTranslatedLoot(store, icons);

    return {
      translatedIcons,
      icons
    }
  }
}
</script>

<style>

</style>