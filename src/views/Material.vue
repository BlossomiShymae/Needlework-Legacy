<template>
  <div id="material" class="ml4">
    <h2 class="title2">Materials</h2>
    <w-divider class="fill-width my2" />
    <div class="loot-grid" v-if="chests">
      <ChestCard v-for="chest in chests" :key="chest" :chest="chest" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";
import ChestCard from "@/components/ChestCard";

export default {
  name: "Material",
  components: {
    ChestCard,
  },
  setup() {
    const store = useStore();

    const { chests } = usePlayerLoot(store);

    return {
      chests,
    };
  },
};
</script>

<style lang="scss" scoped>
#material {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
}
</style>