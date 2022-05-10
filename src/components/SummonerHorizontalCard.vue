<template>
  <div id="summoner-horizontal-card" :key="componentKey" class="bdrs2">
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
        {{ currentSummoner?.displayName ?? 'SUMMONER' }}
      </h3>
      <w-tag id="summoner-level" class="body" outline>{{
        currentSummoner?.summonerLevel ?? 30
      }}</w-tag>
    </div>
    <div id="summoner-next-level-info">
      <p class="text-upper text-bold title5">Next Reward</p>
      <p class="body milestone-awards">{{ milestoneAwards }}</p>
    </div>
    <w-progress
      id="summoner-progress"
      v-model="experienceProgress"
      size="1rem"
      outlined
      round
      label
      label-color="indigo-light5"
      bg-color="indigo-dark4"
      color="indigo"
    >
      {{ currentSummoner?.xpSinceLastLevel ?? 0 }} /
      {{ currentSummoner?.xpUntilNextLevel ?? 1 }} XP
    </w-progress>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SummonerHorizontalCard',
});
</script>

<script setup lang="ts">
import { Ref, ref, computed } from 'vue';

import { IChannel, RChannel } from '@/channels';
import useComponentKey from '@/composables/useComponentKey';
import useProfileIcon from '@/composables/useProfileIcon';
import useSettings from '@/composables/useSettings';
import routes from '@/apis/needlework/src/data/routes';
import type { CurrentSummonerDTO } from '@/types/CurrentSummonerDTO';

const { theme } = useSettings();

const { componentKey, forceRerender } = useComponentKey();

const currentSummoner: Ref<CurrentSummonerDTO | null> = ref(null);

currentSummoner.value = await window.ipcRenderer.invoke(
  IChannel.currentSummoner
);

let rawProfileIcon = await (await useProfileIcon(currentSummoner)).profileIcon;

const profileIcon = computed({
  get() {
    return rawProfileIcon.value;
  },
  set(value: string) {
    rawProfileIcon.value = value;
  },
});

const experienceProgress = computed(() => {
  return (
    (currentSummoner.value!.xpSinceLastLevel /
      currentSummoner.value!.xpUntilNextLevel) *
    100
  );
});

const milestoneAwards = ref('');
const setMilestoneAwards = (
  currentSummoner: Ref<CurrentSummonerDTO | null>
) => {
  milestoneAwards.value = '';
  const levelRewardMap: any = {
    2: '450 BE\nPick one: Lux, Master Yi, Miss Fortune, Brand, Darius',
    3: '450 BE',
    4: '450 BE',
    5: '450 BE',
    6: '900 BE',
    7: 'Poro Pal emote\n900 BE',
    8: 'Random Ward Skin permanent\n900 BE',
    9: '900 BE',
    10: 'New Rune Page\n900 BE',
    11: 'Random 1350 champion shard, 130 BE',
    12: '450 BE',
    13: '450 BE',
    14: '500 BE',
    15: 'Random 4800 champion shard',
    16: '500 BE',
    17: '500 BE',
    18: 'Two random 1350 champion shards',
    19: '600 BE',
    20: 'Random 4800 champion shard\nRandom icon permanent',
    21: '600 BE',
    22: 'Random 3150 champion shard, 20 BE',
    23: '725 BE',
    24: '725 BE',
    25: 'Random 4800 champion shard\nRandom ward skin permanent',
    26: '725 BE',
    27: 'Random 450 champion shard\nRandom 3150 champion shard',
    28: '725 BE',
    29: 'Random 450 champion shard\nRandom 3150 champion shard',
    30: 'Glorious Champion Capsule',
    40: 'Legend 1 Emote',
    50: 'Legend 2 Emote\nRandom summoner icon or ward skin',
    75: 'Legend 3 Emote\nRandom summoner icon or ward skin',
    100: 'Legend 4 Emote\nGlorious Legend ward skin',
    125: 'Legend 5 Emote',
    150: 'Legend 6 Emote',
    175: 'Legend 7 Emote',
    200: 'Legend 8 Emote',
    225: 'Legend 9 Emote',
    250: 'Legend 10 Emote',
    275: 'Legend 11 Emote',
    300: 'Legend 12 Emote',
    325: 'Legend 13 Emote',
    350: 'Legend 14 Emote',
    375: 'Legend 15 Emote',
    400: 'Legend 16 Emote',
    425: 'Legend 17 Emote',
    450: 'Legend 18 Emote',
    475: 'Legend 19 Emote',
    500: 'Legend 20 Emote',
  };

  milestoneAwards.value +=
    levelRewardMap[currentSummoner.value!.summonerLevel + 1] ?? '';

  if (currentSummoner.value!.summonerLevel + 1 > 30) {
    // Milestone awards always have a Glorious Capsule
    if (milestoneAwards.value !== '') {
      milestoneAwards.value += '\nGlorious Champion Capsule';
    } else {
      // Non-milestone awards
      if ((currentSummoner.value!.summonerLevel + 1) % 10 == 0) {
        milestoneAwards.value += 'Glorious Champion Capsule';
      } else if ((currentSummoner.value!.summonerLevel + 1) % 1 == 0) {
        milestoneAwards.value += 'Champion Capsule';
      }
    }

    // Mythic Essence
    if (
      currentSummoner.value!.summonerLevel + 1 >= 150 &&
      (currentSummoner.value!.summonerLevel + 1) % 50 == 0
    ) {
      milestoneAwards.value += '\n10 Mythic Essence';
    }
  }
};
setMilestoneAwards(currentSummoner);

window.ipcRenderer.receive(RChannel.needleworkUpdate, async (uri: any) => {
  if (uri === routes.CURRENT_SUMMONER || uri === routes.LOL_LOOT_READY) {
    currentSummoner.value = await window.ipcRenderer.invoke(
      IChannel.currentSummoner
    );
    profileIcon.value = await (
      await useProfileIcon(currentSummoner)
    ).profileIcon.value;
    setMilestoneAwards(currentSummoner);
    forceRerender(componentKey);
  }
});
</script>

<style lang="scss" scoped>
#summoner-horizontal-card {
  background-color: v-bind('theme.cardColor');
  padding: 12px;

  display: grid;
  grid-template-areas:
    'sc sc'
    'si snli'
    'si snli'
    'sp sp';
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

.milestone-awards {
  white-space: pre-wrap;
  word-wrap: break-word;
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
