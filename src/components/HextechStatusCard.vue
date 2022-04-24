<template>
  <div id="hextech-status-card" :key="componentKey">
    <div id="hextech-blue-essence" class="hextech-status-item">
      <img
        class="hextech-icon"
        src="local-resource://./src/assets/riot_static/currency_champion.png"
      />
      <p class="body text-bold">{{ wallet?.ip ?? 0 }}</p>
    </div>
    <div id="hextech-orange-essence" class="hextech-status-item">
      <img
        class="hextech-icon"
        src="local-resource://./src/assets/riot_static/currency_cosmetic.png"
      />
      <p class="body text-bold">{{ orangeEssence.count ?? 0 }}</p>
    </div>
    <div id="hextech-mythic-essence" class="hextech-status-item">
      <img
        class="hextech-icon"
        src="local-resource://./src/assets/riot_static/currency_mythic.png"
      />
      <p class="body text-bold">{{ mythicEssence?.count ?? 0 }}</p>
    </div>
    <div id="hextech-keys" class="hextech-status-item">
      <img
        class="hextech-icon grayscale-icon"
        src="local-resource://./src/assets/riot_static/material_key.png"
      />
      <p class="body text-bold">{{ keys?.count ?? 0 }}</p>
    </div>
    <div id="hextech-chests" class="hextech-status-item">
      <img
        class="hextech-icon grayscale-icon"
        src="local-resource://./src/assets/riot_static/chest_generic.png"
      />
      <p class="body text-bold">{{ chestCount }}</p>
    </div>
    <div id="hextech-capsules" class="hextech-status-item">
      <img
        class="hextech-icon grayscale-icon"
        src="local-resource://./src/assets/riot_static/portal_chest.png"
      />
      <p class="body text-bold">{{ capsuleCount + orbCount }}</p>
    </div>
    <div id="hextech-status">
      <div id="hextech-disenchant-title">
        <p class="title5">Disenchant value</p>
      </div>
      <div id="hextech-total-title">
        <p class="title5">Total value</p>
      </div>
      <div id="hextech-disenchant-blue-essence" class="hextech-status-item">
        <img
          class="hextech-icon"
          src="local-resource://./src/assets/riot_static/currency_champion.png"
        />
        <p class="body text-bold blue">{{ disenchantBlueEssenceTotal }}</p>
      </div>
      <div id="hextech-disenchant-orange-essence" class="hextech-status-item">
        <img
          class="hextech-icon"
          src="local-resource://./src/assets/riot_static/currency_cosmetic.png"
        />
        <p class="body text-bold blue">{{ disenchantOrangeEssenceTotal }}</p>
      </div>
      <div id="hextech-total-blue-essence" class="hextech-status-item">
        <img
          class="hextech-icon"
          src="local-resource://./src/assets/riot_static/currency_champion.png"
        />
        <p class="body text-bold green">
          {{ (wallet?.ip ?? 0) + disenchantBlueEssenceTotal }}
        </p>
      </div>
      <div id="hextech-total-orange-essence" class="hextech-status-item">
        <img
          class="hextech-icon"
          src="local-resource://./src/assets/riot_static/currency_cosmetic.png"
        />
        <p class="body text-bold green">
          {{ (orangeEssence?.count ?? 0) + disenchantOrangeEssenceTotal }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HextechStatusCard",
});
</script>

<script setup lang="ts">
import { Ref, ref, onMounted } from "vue";

import useComponentKey from "@/composables/useComponentKey";
import useHextechStatus from "@/composables/useHextechStatus";
import usePlayerLoot from "@/composables/usePlayerLoot";
import useSettings from "@/composables/useSettings";
import useTranslatedLoot from "@/composables/useTranslatedLoot";
import routes from "@/apis/needlework/src/data/routes";
import type { WalletDTO } from '@/types/WalletDTO';

onMounted(() => {
  window.ipcRenderer.receive("needlework-update", async (uri: any) => {
    if (uri === routes.WALLET || uri === routes.LOL_LOOT_READY) {
      wallet.value = await window.ipcRenderer.invoke("wallet");
      forceRerender(componentKey);
    }
    if (uri == routes.PLAYER_LOOT_MAP) {
      updateLootCounters();
      forceRerender(componentKey);
    }
  });
});

/**
 * Currencies
 */
const { orangeEssence, mythicEssence, keys, chests } = usePlayerLoot();

/**
 * Chests count (Hextech chests, Masterwork chests)
 * Capsules and orbs count
 */
const chestCount = ref(0);
const capsuleCount = ref(0);
const orbCount = ref(0);

const updateLootCounters = () => {
  const translatedChests = useTranslatedLoot(chests);

  chestCount.value = 0;
  capsuleCount.value = 0;
  orbCount.value = 0;

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
};
updateLootCounters();

/**
 * Component rerendering
 */
const { componentKey, forceRerender } = useComponentKey();
/**
 * User settings
 */
const { theme } = useSettings();

/**
 * WalletDTO
 */
const wallet: Ref<WalletDTO | null> = ref(null);
wallet.value = await window.ipcRenderer.invoke("wallet");

/**
 * HextechStatus
 */
const { disenchantBlueEssenceTotal, disenchantOrangeEssenceTotal } =
  useHextechStatus();
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

  .hextech-status-item {
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

  #hextech-status {
    grid-area: status;
    display: grid;
    grid-template-areas:
      "dtitle dtitle ttitle ttitle"
      "dblue dorange tblue torange";
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: minmax(0, 16px) minmax(0, 1fr);
    gap: 2px;
    margin-top: 16px;
  }

  #hextech-disenchant-title {
    grid-area: dtitle;
  }

  #hextech-total-title {
    grid-area: ttitle;
  }

  #hextech-disenchant-blue-essence {
    grid-area: dblue;
  }

  #hextech-disenchant-orange-essence {
    grid-area: dorange;
  }

  #hextech-total-blue-essence {
    grid-area: tblue;
  }

  #hextech-total-orange-essence {
    grid-area: torange;
  }
}

.hextech-icon {
  image-rendering: -webkit-optimize-contrast;
  margin-right: 2px;
  height: 26px;
  max-width: 100%;
  aspect-ratio: 1/1;
}

.grayscale-icon {
  filter: grayscale(1);
}
</style>