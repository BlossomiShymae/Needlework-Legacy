<template>
  <div id="champion-card">
    <Suspense>
      <BaseLootCard
        :tileIconPath="champion.tilePath"
        :name="champion.itemDesc"
        :loot-name="champion.lootName"
        :type="champion.type"
        :count="champion.count"
        :can-open="true"
        :class="{
          'champion-shard': champion.type === 'Champion Shard',
          'champion-permanent': champion.type === 'Champion Permanent',
        }"
      />
    </Suspense>
  </div>
</template>

<script>
import BaseLootCard from "@/components/loots/BaseLootCard";

export default {
  name: "ChampionCard",
  components: {
    BaseLootCard,
  },
};
</script>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  champion: {
    type: Object,
    required: true,
  },
});
console.log(props.champion);
</script>

<style lang="scss">
.champion-shard {
  filter: grayscale(0.875);
}
</style>