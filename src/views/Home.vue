<template>
  <div class="home">
    <LootMetaPanel />
    <div id="right-grid-area" class="theme-frame-color">
      <div id="loot-view-router" class="styled-scrollbar">
        <router-view v-slot="{ Component }">
          <transition name="swap">
            <component :is="Component" :key="componentKey" />
          </transition>
        </router-view>
      </div>
      <div id="controls-flex">
        <w-button><w-icon>mdi mdi-help-circle-outline</w-icon></w-button>
        <w-menu top min-width="180px">
          <template #activator="{ on }">
            <w-button v-on="on">
              <img
                class="button-icon"
                src="local-resource://./src/assets/riot_static/chest_generic.png"
              />
              <w-icon>mdi mdi-cog-play</w-icon>
              Hextech automation
            </w-button>
          </template>
          <w-checkbox v-model="autoCraftKeyFragmentsMode" @input="refreshLoot()"
            >Auto-craft Key Fragments</w-checkbox
          >
          <w-flex column gap="1">
            <w-divider color="grey">Disenchant</w-divider>
            <w-confirm
              class="theme-button fill-width justify-start pa0 bd0"
              no-arrow
              @confirm="disenchantChampionShards()"
            >
              <w-button class="theme-button fill-width justify-start"
                >Champion Shards</w-button
              >
            </w-confirm>

            <w-button class="theme-button fill-width justify-start">
              Champion Permanents
            </w-button>
            <w-divider color="grey">Open</w-divider>
            <w-button class="theme-button fill-width justify-start">
              All Materials, exclude Chests
            </w-button>
            <w-divider color="grey">Upgrade</w-divider>
            <w-button class="theme-button fill-width justify-start">
              Champion Shards by Highest Tier
            </w-button>
            <w-button class="theme-button fill-width justify-start">
              Champion Shards by Lowest Tier
            </w-button>
          </w-flex>
        </w-menu>
        <w-button @click="refreshLoot()"
          ><w-icon>mdi mdi-refresh</w-icon></w-button
        >
        <div class="flex-divider"></div>
        <w-button><w-icon>mdi mdi-discord</w-icon></w-button>
        <div class="version-info">v0.0</div>
        <a
          href="https://github.com/MissUwuieTime/snip-snip"
          target="_blank"
          class="w-button"
          ><w-icon>mdi mdi-github</w-icon></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LootMetaPanel from "@/components/panels/LootMetaPanel.vue";
import SummonerCard from "@/components/SummonerCard.vue";

export default defineComponent({
  name: "Home",
  components: {
    SummonerCard,

    LootMetaPanel,
  },
});
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/router";
import Time from "@/utils/Time";
import routes from "@/apis/needlework/src/data/routes";
import { IChannel, RChannel } from "@/channels";

import useComponentKey from "@/composables/useComponentKey";
import { useLootStore } from "@/stores/loot";
import useSettings from "@/composables/useSettings";
import { useHextechStatusStore } from "@/stores/hextechStatus";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useCraftRecipe from "@/composables/useCraftRecipe";
import { Context } from "@/enums/context";
import { Loot } from "@/enums/loot";

// Initalize PlayerLoot and it's store
const playerLootMap = ref({});
playerLootMap.value = await window.ipcRenderer.invoke(IChannel.playerLootMap);
const lootStore = useLootStore();
lootStore.updatePlayerLootMap(playerLootMap.value);

// Initialize loot table for loot translations
const lootTable = ref({});
lootTable.value = await window.ipcRenderer.invoke(IChannel.lootTranslation);
lootStore.setLootTable(lootTable.value);

const { theme } = useSettings();

router.push("/home/all");
const { componentKey, forceRerender } = useComponentKey();
const hextechStore = useHextechStatusStore();

const { autoCraftKeyFragmentsMode } = useSettings();

const processAutomationPipeline = async () => {
  const { craftRecipe } = useCraftRecipe();
  if (autoCraftKeyFragmentsMode) {
    await lootStore.mutex.runExclusive(async () => {
      const { keyFragments } = usePlayerLoot();
      if (keyFragments?.value && keyFragments.value.count >= 3) {
        await craftRecipe(
          Loot.LootId.KEY_FRAGMENT,
          Context.ActionType.FORGE,
          (keyFragments.value.count / 3) | 0
        );
      }
    });
  }
  playerLootMap.value = await window.ipcRenderer.invoke(IChannel.playerLootMap);
};

const refreshLoot = async () => {
  playerLootMap.value = await window.ipcRenderer.invoke(IChannel.playerLootMap);
  await processAutomationPipeline();
  lootStore.updatePlayerLootMap(playerLootMap.value);
  hextechStore.updateLootCounters();
  forceRerender(componentKey);
};

const disenchantChampionShards = async () => {
  const { craftRecipe } = useCraftRecipe();
  await lootStore.mutex.runExclusive(async () => {
    const { champions } = usePlayerLoot();
    const shards = champions.value.filter((loot) => {
      if (loot.type === Loot.Type.CHAMPION_SHARD) return true;
      return false;
    });
    if (shards.length > 0) {
      for (const shard of shards) {
        await craftRecipe(
          shard.lootId,
          Context.ActionType.DISENCHANT,
          shard.count
        );
      }
    }
  });
  playerLootMap.value = await window.ipcRenderer.invoke(IChannel.playerLootMap);
};

onMounted(() => {
  window.ipcRenderer.receive(RChannel.needleworkUpdate, async (uri: any) => {
    if (lootStore.mutex.isLocked() === false) {
      if (uri === routes.PLAYER_LOOT_MAP) {
        console.log(
          "Received event update from NeedleworkService - " +
            uri +
            " " +
            Time.toString()
        );
        await refreshLoot();
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.theme-button {
  filter: brightness(100%);
  transition: filter 0.25s ease-in-out;
  &:hover {
    filter: brightness(125%);
  }
}
.home {
  background-color: inherit;
  --swap-height: calc(93.75%);
}
.swap-enter-active,
.swap-leave-active {
  @extend .styled-scrollbar;

  position: absolute;
  width: 99%;
  height: calc(var(--swap-height) - $window-button-bar-height);
  overflow-y: scroll;

  transition: transform 0.5s ease-in-out;
  transform: translateX(0);
}

.swap-enter-from,
.swap-leave-to {
  position: absolute;
  width: 99%;
  height: calc(var(--swap-height) - $window-button-bar-height);
  transform: translateX(100%);
  overflow-y: scroll;
}

#loot-view-router {
  overflow-y: scroll;
  padding-left: 8px;
}

.home {
  height: 100vh;
  background-color: v-bind("theme.backgroundColor");

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  column-gap: 1px;

  #left-grid-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 64px + 16px;
  }

  #right-grid-area {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15fr 1fr;
    padding-top: 20px;
    overflow: hidden;
  }

  #controls-flex {
    display: flex;
    justify-items: center;
    align-items: center;
    align-content: center;
    gap: 8px;
    color: v-bind("theme.textColor");
    padding-left: 8px;
    padding-right: 8px;

    &:deep(.w-button) {
      color: white;
      background-color: v-bind("theme.paletteColor[0]");
    }

    a.w-button {
      transition: filter 0.25s ease-in-out;
      filter: brightness(100%);
      &:hover {
        filter: brightness(150%);
      }
    }

    .flex-divider {
      flex: 1;
    }

    .version-info {
      height: 100%;
      font-size: 0.875rem;
      width: 100px;
      color: darkgrey;
      border: 1px solid grey;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  #loot-button-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    column-gap: 16px;
    row-gap: 16px;

    margin-top: 32px;
  }
}
</style>
