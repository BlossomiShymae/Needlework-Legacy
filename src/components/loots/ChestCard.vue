<template>
  <div id="chest-card">
    <Suspense>
      <template #default>
        <div class="default-wrapper">
          <BaseLootCard
            :tileIconPath="chest.tilePath"
            :name="lootName"
            :loot-name="rawName"
            :type="chest.type"
            :count="chest.count"
            :can-open="canOpen"
            :loot="chest"
          />
          <div
            class="mastery-token-6-badge mastery-badge"
            v-if="isMasteryToken6"
          ></div>
          <div
            class="mastery-token-7-badge mastery-badge"
            v-if="isMasteryToken7"
          ></div>
        </div>
      </template>
      <template #fallback>
        <LoadingLootBeeMad />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLootCard from '@/components/loots/BaseLootCard.vue';
import LoadingLootBeeMad from '@/components/fallbacks/LoadingLootBeeMad.vue';

export default defineComponent({
  name: 'ChestCard',
  components: {
    BaseLootCard,
    LoadingLootBeeMad,
  },
});
</script>

<script setup lang="ts">
import { defineProps, computed, onMounted, ref } from 'vue';
import type { PlayerLoot } from '@/types/PlayerLoot';

const props = defineProps<{
  chest: PlayerLoot;
  rawName: string;
}>();

const canOpen = ref(true);
const isMasteryToken6 = ref(false);
const isMasteryToken7 = ref(false);

const lootName = computed(() => {
  if (props.chest.lootName.includes('Mastery')) {
    return `${props.chest.lootName} ${props.chest.itemDesc}`;
  }
  if (props.chest.localizedName) {
    return props.chest.localizedName;
  }
  if (props.chest.lootId === 'MATERIAL_key_fragment') {
    if (props.chest.count > 1) return 'Key Fragments';
    return 'Key Fragment';
  }
  if (props.chest.lootName === 'CHEST_212') {
    return 'Glorious Champion Capsule - 10 ME';
  }
  if (props.chest.lootName !== '') return props.chest.lootName;
  return 'Unknown Material, Contact Dev';
});

onMounted(() => {
  if (props.chest.lootName.includes('Mastery 6')) isMasteryToken6.value = true;
  if (props.chest.lootName.includes('Mastery 7')) isMasteryToken7.value = true;

  const masterialBlacklist = ['token', 'essence'];

  masterialBlacklist.forEach((name) => {
    if (
      props.chest.lootName.toLowerCase().includes(name) ||
      props.chest.localizedName.toLowerCase().includes(name)
    ) {
      canOpen.value = true;
      return true;
    }
  });
});
</script>

<style lang="scss" scoped>
$badge-width: 12px;
$badge-height: 12px;

.mastery-badge {
  position: relative;
  top: -$base-loot-card-height;
  right: calc(-#{$base-loot-card-width} - 4px);
  width: $badge-width;
  height: $badge-height;
  z-index: 99;
}

.mastery-token-6-badge {
  $token-color: purple;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: $token-color;
}

.mastery-token-7-badge {
  $token-color: aqua;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background-color: $token-color;
}
</style>
