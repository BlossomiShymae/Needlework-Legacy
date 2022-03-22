<template>
  <div class="summoner-card">
    <div id="summoner-icon" class="floating">
      <div id="wrapper">
        <w-image
          class="bdrs4 sh2"
          :src="profileIcon"
          ratio="1/1"
          alt="Summoner profile icon"
          transition="scale-fade"
        />
      </div>
    </div>

    <p id="summoner-level" class="body floating text-bold">
      {{ currentSummoner.summonerLevel }}
    </p>
    <div id="summoner-content" class="sh4">
      <h3 class="title3 text-bold">{{ currentSummoner.displayName }}</h3>
      <w-divider class="ma1" />
      <WalletStatus :wallet="wallet" />
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import useProfileIcon from "@/composables/useProfileIcon";
import WalletStatus from "@/components/WalletStatus";
import useSettings from "@/composables/useSettings";
import store from "@/store/index";

export default {
  name: "SummonerCard",
  components: {
    WalletStatus,
  },
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

    const { theme } = useSettings(store);

    return {
      profileIcon,
      theme,
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
    background-color: v-bind("theme.cardColor");
    width: 200px;
    border-radius: 0.5rem;
    padding: 8px;
    padding-top: 32px;
    color: v-bind("theme.textColor");

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #summoner-level {
    z-index: 12;
    background-color: v-bind("theme.paletteColor[0]");
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
    height: 128px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: calc(0px - 20%);
      left: calc(0px - 20%);
      border-radius: 0.5rem;
      background: conic-gradient(
        v-bind("theme.paletteColor[0]"),
        v-bind("theme.paletteColor[1]"),
        v-bind("theme.paletteColor[2]"),
        v-bind("theme.paletteColor[0]")
      );

      height: 140%;
      width: 140%;
      background-color: black;
      animation: spin 4s infinite linear;
    }

    #wrapper {
      width: 120px;
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

@keyframes spin {
  100% {
    transform: rotate(-360deg);
  }
}
</style>