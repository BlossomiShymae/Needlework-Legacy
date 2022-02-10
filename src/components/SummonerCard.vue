<template>
  <div class="summoner-card">
    <img
      id="summoner-icon"
      class="floating"
      :src="src"
      alt="Summoner profile icon"
    />
    <p id="summoner-level" class="body floating">{{ summonerLevel }}</p>
    <div id="summoner-content" class="sh4">
      <h3 class="title3">{{ summonerName }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummonerCard",
  props: {
    src: {
      type: String,
      required: true,
    },
    summonerName: {
      type: String,
      required: true,
    },
    summonerLevel: {
      type: Number,
      required: true,
    },
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
  }

  #summoner-icon {
    z-index: 11;
    position: fixed;
    margin-top: -105px;
    width: 128px;
    height: auto;
    border-radius: 1rem;
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