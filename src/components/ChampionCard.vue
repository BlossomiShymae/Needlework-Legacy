<template>
  <div id="champion-card">
    <BaseLootCard
      :src="src"
      :name="champion.itemDesc"
      :loot-name="champion.lootName"
      :type="champion.type"
      :count="champion.count"
    />
  </div>
</template>

<script>
import BaseLootCard from "@/components/BaseLootCard";

export default {
  name: "ChampionCard",
  components: {
    BaseLootCard,
  },
  props: {
    champion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    };
  },
};
</script>

<style>
</style>