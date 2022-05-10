<template>
  <div class="base-loot-card">
    <w-menu left shadow @open="setupContextMenu(loot)">
      <template #activator="{ on }">
        <div class="loot-item" v-bind="$attrs" :class="$attrs.class" v-on="on">
          <img :src="tileIcon" class="tile-icon" />
          <div class="icon-overlay"></div>
          <p class="loot-count">x{{ count }}</p>
        </div>
      </template>
      <div class="text-left lh2" id="menu">
        <p class="title4 text-bold text-upper">{{ name }}</p>
        <p class="title5">{{ lootName }}</p>
        <p class="body capitalize">{{ type }}</p>

        <w-divider class="full-width my2"></w-divider>

        <div id="menu-actions">
          <div v-if="canOpen && contextMenuList" :key="loot.lootId">
            <div
              class="action"
              v-for="contextMenu in contextMenuList"
              :key="contextMenu.actionType + '_once'"
              :style="{
                color: theme.textColor,
                backgroundColor: theme.cardColor,
              }"
              @click="doAction(loot, contextMenu, 1)"
            >
              <p>{{ capitalize(contextMenu.actionType) }}</p>
            </div>
            <div
              class="action-form"
              v-for="contextMenu in contextMenuList"
              :key="contextMenu.actionType + '_multiple'"
            >
              <w-confirm
                class="action"
                :style="{
                  color: theme.textColor,
                  backgroundColor: theme.cardColor,
                }"
                no-arrow
                v-if="multipleLootWarningMode"
                @confirm="doAction(loot, contextMenu, repeatNumber)"
              >
                <p>{{ capitalize(contextMenu.actionType) }} by amount</p>
              </w-confirm>

              <div
                v-if="multipleLootWarningMode === false"
                class="action"
                :style="{
                  color: theme.textColor,
                  backgroundColor: theme.cardColor,
                }"
                @click="doAction(loot, contextMenu, repeatNumber)"
              >
                <p>{{ capitalize(contextMenu.actionType) }} by amount</p>
              </div>

              <w-input
                class="repeat-input"
                type="number"
                v-model="repeatNumber"
              ></w-input>
            </div>

            <div
              v-for="contextMenu in contextMenuList"
              :key="contextMenu.actionType + '_all'"
            >
              <w-confirm
                v-if="multipleLootWarningMode"
                class="action"
                :style="{
                  color: theme.textColor,
                  backgroundColor: theme.cardColor,
                }"
                @confirm="doAction(loot, contextMenu, loot.count)"
              >
                <p>
                  {{ capitalize(contextMenu.actionType) }} all
                  <span class="caption" :style="{ color: theme.textColor }"
                    >"Snip snip!"</span
                  >
                </p>
              </w-confirm>
              <div
                v-if="multipleLootWarningMode === false"
                class="action"
                :style="{
                  color: theme.textColor,
                  backgroundColor: theme.cardColor,
                }"
                @click="doAction(loot, contextMenu, loot.count)"
              >
                <p>
                  {{ capitalize(contextMenu.actionType) }} all
                  <span class="caption" :style="{ color: theme.textColor }"
                    >"Snip snip!"</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </w-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseLootCard',
});
</script>

<script setup lang="ts">
import { defineProps, toRefs, ref } from 'vue';

import type { PlayerLoot } from '@/types/PlayerLoot';
import useContextMenu from '@/composables/useContextMenu';
import useTileIcon from '@/composables/useTileIcon';
import useSettings from '@/composables/useSettings';

const props = defineProps<{
  tileIconPath: string;
  name: string;
  count: number;
  lootName: string;
  type: string;
  canOpen: boolean;
  loot: PlayerLoot;
}>();

const { tileIconPath } = toRefs(props);
const { tileIcon } = await useTileIcon(tileIconPath);
const { theme, multipleLootWarningMode } = useSettings();

/**
 * Loot context menu functions
 */
const { contextMenuList, setupContextMenu, doAction, capitalize } =
  useContextMenu();

/**
 * Prevalidates a repeatNumber upon props passing
 */
function setupRepeatNumber() {
  let repeatNumber = ref(0);
  const { loot } = toRefs(props);
  if (loot.value.count > 10) {
    repeatNumber.value = 10;
  } else {
    repeatNumber.value = loot.value.count;
  }
  return repeatNumber;
}

const repeatNumber = setupRepeatNumber();
</script>

<style lang="scss" scoped>
.repeat-input {
  margin-top: 2px;
}
.caption {
  color: v-bind('theme.textColor');
}

#menu-actions {
  .action {
    padding: 2px;
    text-align: left;
    height: min-content;
    filter: brightness(100%);
    transition: filter 0.25s ease-in-out;

    &:hover {
      filter: brightness(100%) invert(95%);
    }

    &:deep(.w-button) {
      padding: 0;
      font-size: 1rem;
      width: 100%;
      justify-content: flex-start;
      border: 0;
    }
  }

  .action-form {
    display: grid;
    grid-template-columns: minmax(0, auto) minmax(0, 50px);
    grid-template-rows: minmax(0, 1fr);
    gap: 4px;
  }
}
.loot-item {
  --card-border-radius: 0.5rem;

  position: relative;
  width: $base-loot-card-width;
  height: $base-loot-card-height;

  .tile-icon {
    position: absolute;
    height: $base-loot-card-height;
    width: $base-loot-card-width;
    top: 0;
    left: 0;

    border-radius: var(--card-border-radius);
    image-rendering: -webkit-optimize-contrast;
    z-index: 97;
  }

  .icon-overlay {
    position: absolute;
    height: $base-loot-card-height;
    width: $base-loot-card-width;
    top: 0;
    left: 0;

    border-radius: var(--card-border-radius);
    box-shadow: 2px 2px 8px inset black;
    z-index: 98;
  }

  .loot-count {
    position: absolute;
    font-size: 1rem;
    color: white;
    font-family: 'Consolas', sans-serif;
    font-weight: bold;
    text-shadow: 2px 2px 2px #000, -1px -1px 2px #000, 1px -1px 0 #000,
      -1px 1px 0 #000, 1px 1px 0 #000, 2px 2px 2px #000, -1px -1px 2px #000,
      1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    padding: 6px;
    right: 0;
    bottom: 0;
    border-radius: 50% 0 var(--card-border-radius) 0;
    z-index: 99;
  }
}
</style>
