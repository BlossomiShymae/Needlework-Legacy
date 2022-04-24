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

<script lang="ts">
import { defineComponent } from "vue";
import BaseLootCard from "@/components/loots/BaseLootCard.vue";

export default defineComponent({
  name: "ChampionCard",
  components: {
    BaseLootCard,
  },
});
</script>

<script setup lang="ts">
import { defineProps } from "vue";
import type { PlayerLoot } from '@/types/PlayerLoot';

const props = defineProps<{
  champion: PlayerLoot,
}>();
</script>

<style lang="scss">
.champion-shard {
  filter: grayscale(0.875);
}
</style>