<template>
  <div class="home">
    <div id="left-grid-area">
      <SummonerCard
        src="local-resource://./src/assets/4409.png"
        summoner-name="time for uwu"
        :summoner-level="600"
      />
    </div>
    <div>
      <h2 class="title2">Disenchant</h2>
      <w-button medium shadow round>
        <img
          src="local-resource://./src/assets/riot_static/icon-blue-essence.png"
          alt=""
        />
        All Champion Shards
      </w-button>
    </div>
  </div>
</template>

<script>
import SummonerCard from "@/components/SummonerCard";

export default {
  name: "Home",
  components: {
    SummonerCard,
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 1px;
  height: calc(100vh - 2px);

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  column-gap: 1px;

  #left-grid-area {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div {
    background-color: $app-frame-color;
    color: black;
  }

  button {
    img {
      height: 20px;
      width: auto;
    }
  }
}
</style>
