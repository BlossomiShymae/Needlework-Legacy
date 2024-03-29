<template>
  <div class="crafted-card bdrs2">
    <div class="crafted-grid" v-if="flatCraftedHistory.length === 0"></div>
    <div class="crafted-grid">
      <div
        class="crafted-item"
        v-for="craftedLoot in flatCraftedHistory"
        :key="(craftedLoot as any)"
      >
        <Suspense>
          <LootIcon :player-loot="craftedLoot.playerLoot" />
        </Suspense>
        <div class="crafted-info">
          <p class="body" v-if="craftedLoot.craftType === 'removed'">
            -{{ craftedLoot.deltaCount }}
            {{ translate(craftedLoot.playerLoot) }}
          </p>
          <p class="body" v-else>
            x{{ craftedLoot.deltaCount }}
            {{ translate(craftedLoot.playerLoot) }}
          </p>
          <p class="body">
            {{ (translateLoot(craftedLoot.playerLoot) as PlayerLoot).type }}
          </p>
        </div>
      </div>
    </div>
    <div class="crafted-bar">
      <button class="crafted-button" @click="isCardExpanded = !isCardExpanded">
        <w-icon>mdi mdi-arrow-expand-up</w-icon>
      </button>
      <button class="crafted-button" @click="resetCraftStore()">
        <w-icon>mdi mdi-delete-sweep</w-icon>
      </button>
      <p class="title">Crafted</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LootIcon from '@/components/icons/LootIcon.vue';

export default defineComponent({
  name: 'CraftedCard',
  components: {
    LootIcon,
  },
});
</script>

<script setup lang="ts">
import useCraftStatus from '@/composables/useCraftStatus';
import useSettings from '@/composables/useSettings';
import useTranslatedLoot from '@/composables/useTranslatedLoot';
import type { PlayerLoot } from '@/types/PlayerLoot';

const { theme } = useSettings();
const { resetCraftStore, isCardExpanded, flatCraftedHistory } =
  useCraftStatus();
const { translateLoot } = useTranslatedLoot();
const translate = (loot?: PlayerLoot) => {
  if (typeof loot === 'undefined') return '';
  const predicate = translateLoot(loot) as PlayerLoot;
  if (predicate.itemDesc !== '') return predicate.itemDesc;
  return predicate.lootName;
};
console.log(flatCraftedHistory.value);
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;
  text-align: right;
  font-size: 1.125rem;
  font-weight: bold;
}

.crafted-card {
  background-color: v-bind('theme.cardColor');
  color: v-bind('theme.textColor');
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) minmax(min-content, max-content);
  padding: 8px;
  gap: 2px;
}

.crafted-bar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 2fr);
  grid-template-rows: minmax(0, 1fr);
}

.crafted-grid {
  overflow-y: auto;

  display: grid;
  background-color: v-bind('theme.frameColor');
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
  gap: 12px;

  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: lightgray;
  }

  &::-webkit-scrollbar-thumb {
    background: grey;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
}

.crafted-item {
  display: grid;
  grid-template-columns: minmax(min-content, max-content) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 4px;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
}

.crafted-info {
  text-align: left;
  word-wrap: break-word;
}

.crafted-button {
  background-color: v-bind('theme.paletteColor[0]');
  color: white;
  border: 0;
  width: 80%;
  height: 80%;
  align-self: center;
  justify-self: center;
  border: 1px solid grey;
  font-size: 0.75rem;

  transition: filter 0.25s ease-in-out;
  filter: brightness(100%);

  &:hover {
    filter: brightness(150%);
  }
}
</style>
