<template>
  <div class="summoner-card">
    <div id="summoner-icon" class="floating">
      <w-image
        class="bdrs4 sh2"
        :src="profileIcon"
        ratio="1/1"
        alt="Summoner profile icon"
        transition="scale-fade"
      />
    </div>

    <p id="summoner-level" class="body floating text-bold">
      {{ currentSummoner.summonerLevel }}
    </p>
    <div id="summoner-content" class="sh4">
      <h3 class="title3">{{ currentSummoner.displayName }}</h3>
      <w-divider class="ma1" />
      <div id="wallet">
        <img
          src="local-resource://./src/assets/riot_static/icon-blue-essence.png"
          alt="Blue essence icon"
        />
        <p class="body">{{ wallet.ip }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import useProfileIcon from "@/composables/useProfileIcon";

export default {
  name: "SummonerCard",
  props: {
    currentSummoner: {
      type: Object,
      required: true,
    },
    wallet: {
      type: Object,
      required: true,
    },
  },
  async setup(props) {
    const { currentSummoner } = toRefs(props);

    const { profileIcon } = await useProfileIcon(currentSummoner);

    return {
      profileIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.summoner-card {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  #summoner-content {
    z-index: 10;
    background-color: rgba($app-base-card-color, 0.8);
    width: 200px;
    border-radius: 0.5rem;
    padding: 8px;
    padding-top: 32px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #summoner-level {
    z-index: 12;
    background-color: rgba($app-palette-color1, 0.75);
    border-radius: 0.5rem;
    color: white;
    padding: 4px;
    position: fixed;
    margin-top: 7.5px;
    letter-spacing: 2px;
  }

  #summoner-icon {
    z-index: 11;
    position: fixed;
    margin-top: -105px;
    width: 128px;
    height: auto;
  }

  #wallet {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;

    img {
      image-rendering: -webkit-optimize-contrast;
      margin-right: 2px;
      width: 16px;
      height: auto;
    }
  }

  .w-divider {
    width: 100%;
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
    transform: translate(0, -8px);
  }
  100% {
    transform: translate(0, -0px);
  }
}
</style>