<template>
  <div id="skin-card">
    <Suspense>
      <template #default>
        <div class="default-wrapper">
          <BaseLootCard
            :tileIconPath="skin.tilePath"
            :name="skin.itemDesc"
            :loot-name="skin.lootName"
            :type="skin.type"
            :count="skin.count"
            :can-open="true"
            :loot="skin"
            :class="{
              'skin-shard': skin.type === 'Skin Shard',
              'skin-permanent': skin.type === 'Skin Permanent',
            }"
          />
          <div class="skin-rarity-epic skin-rarity" v-if="isEpic"></div>
          <div
            class="skin-rarity-legendary skin-rarity"
            v-if="isLegendary"
          ></div>
          <div class="skin-rarity-mythic skin-rarity" v-if="isMythic"></div>
          <div class="skin-rarity-ultimate skin-rarity" v-if="isUltimate"></div>
          <div class="skin-legacy" v-if="isLegacy"></div>
        </div>
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseLootCard from "@/components/loots/BaseLootCard.vue";

export default defineComponent({
  name: "SkinCard",
  components: {
    BaseLootCard,
  },
});
</script>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";

import type { PlayerLoot } from "@/types/PlayerLoot";
import { Loot } from "@/enums/loot";

const props = defineProps<{
  skin: PlayerLoot;
}>();

const isEpic = ref(false);
const isLegendary = ref(false);
const isMythic = ref(false);
const isUltimate = ref(false);
const isLegacy = ref(false);

onMounted(() => {
  if (props.skin.rarity.includes(Loot.Rarity.EPIC)) isEpic.value = true;
  if (props.skin.rarity.includes(Loot.Rarity.LEGENDARY))
    isLegendary.value = true;
  if (props.skin.rarity.includes(Loot.Rarity.MYTHIC)) isMythic.value = true;
  if (props.skin.rarity.includes(Loot.Rarity.ULTIMATE)) isUltimate.value = true;
  if (props.skin.tags?.includes("legacy")) isLegacy.value = true;
});
</script>

<style lang="scss">
.skin-shard {
  filter: grayscale(0.875);
}
</style>

<style lang="scss" scoped>
$badge-width: 12px;
$badge-height: 12px;

.skin-rarity {
  position: relative;
  top: -$base-loot-card-height;
  right: calc(-#{$base-loot-card-width} - 4px);
  width: $badge-width;
  height: $badge-height;
  z-index: 99;
  background-color: black;
  margin-bottom: 8px;
}

.skin-legacy {
  position: relative;
  top: -$base-loot-card-height;
  right: calc(-#{$base-loot-card-width} - 4px);
  width: $badge-width;
  height: $badge-height;
  z-index: 99;
  background-color: #779;
  border-radius: 100%;
}

.skin-rarity-epic {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background-color: #0dd;
}

.skin-rarity-legendary {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: red;
}

.skin-rarity-mythic {
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  background-color: purple;
}

.skin-rarity-ultimate {
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  background-color: gold;
}
</style>
