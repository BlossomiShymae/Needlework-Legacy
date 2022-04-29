<template>
  <div
    class="loot-icon"
    v-if="
      typeof playerLoot !== 'undefined' &&
      typeof playerLoot.value !== 'undefined'
    "
  >
    <img :src="tileIcon" class="tile-icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LootIcon",
});
</script>

<script setup lang="ts">
import { defineProps, toRefs, Ref } from "vue";
import useTileIcon from "@/composables/useTileIcon";
import type { PlayerLoot } from "@/types/PlayerLoot";

const props = defineProps<{
  playerLoot: undefined | PlayerLoot;
}>();

const { playerLoot } = toRefs(props);
let tileIcon: Ref<string>;
if (
  typeof playerLoot !== "undefined" &&
  typeof playerLoot.value !== "undefined"
) {
  tileIcon = await (await useTileIcon(playerLoot.value.tilePath)).tileIcon;
}
</script>

<style lang="scss" scoped>
.loot-icon {
  width: 64px;
  height: 64px;

  .tile-icon {
    width: 100%;
    height: auto;
    image-rendering: -webkit-optimize-contrast;
  }
}
</style>
