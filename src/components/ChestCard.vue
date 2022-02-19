<template>
  <div id="chest-card">
    <BaseLootCard
      :src="src"
      :name="lootName"
      :loot-name="rawName"
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
    rawName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    };
  },
  computed: {
    lootName() {
      if (this.chest?.lootName.includes("Mastery")) {
        return `${this.chest?.lootName} ${this.chest?.itemDesc}`;
      }
      return this.chest?.lootName;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>