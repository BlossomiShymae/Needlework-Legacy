<template>
  <div id="summoner-horizontal-card" :key="componentKey">
    <div id="summoner-icon">
      <w-image
        class="bdrs4 sh2"
        :src="profileIcon"
        transition="scale-fade"
        ratio="1/1"
      />
    </div>
    <div id="summoner-content">
      <h3 class="title3 text-bold" id="summoner-display-name">
        {{ currentSummoner.displayName }}
      </h3>
      <w-tag id="summoner-level" class="body" outline>{{
        currentSummoner.summonerLevel
      }}</w-tag>
    </div>
    <div id="summoner-next-level-info">
      <p class="text-upper text-bold title5">Next Reward</p>
      <p class="body">Next milestone awards go here</p>
    </div>
    <w-progress
      id="summoner-progress"
      v-model="experienceProgress"
      size="0.8rem"
      outlined
      round
      label
      label-color="indigo-light4"
    >
      {{ currentSummoner.xpSinceLastLevel }} /
      {{ currentSummoner.xpUntilNextLevel }} XP
    </w-progress>
  </div>
</template>

<script>
export default {
  name: "SummonerHorizontalCard",
};
</script>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import useComponentKey from "@/composables/useComponentKey";
import useProfileIcon from "@/composables/useProfileIcon";
import useSettings from "@/composables/useSettings";
import routes from "@/apis/needlework/src/data/routes";

const store = useStore();
const { theme } = useSettings(store);

const { componentKey, forceRerender } = useComponentKey();

const currentSummoner = ref(null);

currentSummoner.value = await window.ipcRenderer.invoke("current-summoner");

let rawProfileIcon = await (await useProfileIcon(currentSummoner)).profileIcon;

const profileIcon = computed({
  get() {
    return rawProfileIcon.value;
  },
  set(newValue) {
    rawProfileIcon.value = newValue;
  },
});

const experienceProgress = computed(() => {
  return (
    (currentSummoner.value.xpSinceLastLevel /
      currentSummoner.value.xpUntilNextLevel) *
    100
  );
});

window.ipcRenderer.receive("needlework-update", async (uri) => {
  if (uri === routes.CURRENT_SUMMONER || uri === routes.LOL_LOOT_READY) {
    currentSummoner.value = await window.ipcRenderer.invoke("current-summoner");
    profileIcon.value = await (
      await useProfileIcon(currentSummoner)
    ).profileIcon.value;
    forceRerender(componentKey);
  }
});
</script>

<style lang="scss" scoped>
#summoner-horizontal-card {
  background-color: v-bind("theme.cardColor");
  padding: 12px;

  display: grid;
  grid-template-areas:
    "sc sc"
    "si snli"
    "si snli"
    "sp sp";
  grid-template-rows: minmax(0, 1fr) minmax(0, 4fr) minmax(0, 4fr) minmax(
      0,
      1fr
    );
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 8px;
  overflow: hidden;

  #summoner-icon {
    width: 100%;
    max-height: 100%;
    aspect-ratio: 1/1;
    align-self: flex-start;
    justify-self: flex-start;

    grid-area: si;
  }

  #summoner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    grid-area: sc;

    #summoner-display-name {
      display: block;
      white-space: nowrap;
      width: max-content;
    }
  }

  #summoner-next-level-info {
    grid-area: snli;
    text-align: left;
  }

  #summoner-progress {
    display: inline-block;
    width: 100%;
    grid-area: sp;
  }
}
.floating {
  animation-name: floating;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes floating {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, -4px);
  }
  100% {
    transform: translate(0, -0px);
  }
}
</style>