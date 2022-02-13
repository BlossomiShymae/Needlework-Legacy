<template>
  <div id="chest-card">
    <BaseLootCard
      :src="src"
      :name="chestName"
      :loot-name="chest.lootName"
      :type="chest.type"
      :count="chest.count"
    />
  </div>
</template>

<script>
import BaseLootCard from "@/components/BaseLootCard";

export default {
  name: "ChestCard",
  components: {
    BaseLootCard,
  },
  props: {
    chest: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    };
  },
  computed: {
    chestName() {
      switch (this.chest?.type) {
        case "CHAMPION_TOKEN":
          return (
            "Mastery " +
            this.chest.lootName.charAt(this.chest.lootName.length - 1) +
            " Token - " +
            this.chest.itemDesc
          );
        case "CHEST":
          switch (this.chest?.lootId) {
            case "CHEST_128":
              return "Champion Capsule";
            case "CHEST_129":
              return "Glorious Champion Capsule";
          }
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>