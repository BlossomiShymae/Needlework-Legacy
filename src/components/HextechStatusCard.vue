<template>
  <div id="hextech-status-card" :key="componentKey">
    <div id="hextech-blue-essence">
      <img
        class="hextech-icon"
        src="local-resource://./src/assets/riot_static/currency_champion.png"
      />
      <p class="body text-bold">{{ wallet.ip }}</p>
    </div>
    <div id="hextech-orange-essence">
      <img
        class="hextech-icon"
        src="local-resource://./src/assets/riot_static/currency_cosmetic.png"
      />
      <p class="body text-bold">{{ orangeEssence?.count ?? 0 }}</p>
    </div>
    <div id="hextech-mythic-essence">
      <img
        class="hextech-icon"
        src="local-resource://./src/assets/riot_static/currency_mythic.png"
      />
      <p class="body text-bold">{{ mythicEssence?.count ?? 0 }}</p>
    </div>
    <div id="hextech-keys">
      <img
        class="hextech-icon grayscale-icon"
        src="local-resource://./src/assets/riot_static/material_key.png"
      />
      <p class="body text-bold">{{ keys?.count ?? 0 }}</p>
    </div>
    <div id="hextech-chests">
      <img
        class="hextech-icon grayscale-icon"
        src="local-resource://./src/assets/riot_static/chest_generic.png"
      />
      <p class="body text-bold">{{ chestCount }}</p>
    </div>
    <div id="hextech-capsules">
      <img
        class="hextech-icon grayscale-icon"
        src="local-resource://./src/assets/riot_static/portal_chest.png"
      />
      <p class="body text-bold">{{ capsuleCount + orbCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HextechStatusCard",
};
</script>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import usePlayerLoot from "@/composables/usePlayerLoot";

import useComponentKey from "@/composables/useComponentKey";
import useSettings from "@/composables/useSettings";
import useTranslatedLoot from "@/composables/useTranslatedLoot";

onMounted(() => {
  window.ipcRenderer.receive("needlework-update", async () => {
    wallet.value = await window.ipcRenderer.invoke("wallet");
    forceRerender(componentKey);
  });
});

/**
 * Vuex global store
 */
const store = useStore();

/**
 * Currencies
 */
const { orangeEssence, mythicEssence, keys, chests } = usePlayerLoot(store);

/**
 * Chests count (Hextech chests, Masterwork chests)
 * Capsules and orbs count
 */
const translatedChests = useTranslatedLoot(store, chests);
const chestCount = ref(0);
const capsuleCount = ref(0);
const orbCount = ref(0);
translatedChests.value?.forEach((chest) => {
  if (chest.localizedName !== "") {
    if (chest.localizedName.toLowerCase().includes("chest"))
      chestCount.value += chest.count;
    if (chest.localizedName.toLowerCase().includes("capsule"))
      capsuleCount.value += chest.count;
    if (chest.localizedName.toLowerCase().includes("orb"))
      orbCount.value += chest.count;
    return;
  }

  if (chest.lootName !== "") {
    if (
      chest.lootName.toLowerCase().includes("chest") &&
      chest.lootName !== "CHEST_212"
    ) {
      chestCount.value += chest.count;
    }
    if (chest.lootName.toLowerCase().includes("capsule"))
      capsuleCount.value += chest.count;
    if (chest.lootName.toLowerCase().includes("orb"))
      orbCount.value += chest.count;
  }
});

/**
 * Component rerendering
 */
const { componentKey, forceRerender } = useComponentKey();
/**
 * User settings
 */
const { theme } = useSettings(store);

/**
 * WalletDTO
 */
const wallet = ref(null);
wallet.value = await window.ipcRenderer.invoke("wallet");
</script>

<style lang="scss" scoped>
#hextech-status-card {
  background-color: v-bind("theme.cardColor");
  padding: 12px;

  display: grid;
  grid-template-areas:
    "blue orange mythic"
    "chests keys capsules"
    "status status status";
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 2fr);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  overflow: hidden;

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #hextech-blue-essence {
    grid-area: blue;
  }

  #hextech-orange-essence {
    grid-area: orange;
  }

  #hextech-mythic-essence {
    grid-area: mythic;
  }

  #hextech-keys {
    grid-area: keys;
  }

  #hextech-chests {
    grid-area: chests;
  }

  #hextech-capsules {
    grid-area: capsules;
    .grayscale-icon {
      filter: grayscale(1) brightness(0.75);
    }
  }
}

.hextech-icon {
  image-rendering: -webkit-optimize-contrast;
  margin-right: 2px;
  height: 100%;
  max-width: 100%;
  aspect-ratio: 1/1;
}

.grayscale-icon {
  filter: grayscale(1);
}
</style>