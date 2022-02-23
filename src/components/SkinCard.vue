<template>
  <div id="skin-card">
    <BaseLootCard
      :src="src"
      :name="skin.itemDesc"
      :loot-name="skin.lootName"
      :type="skin.type"
      :count="skin.count"
    />
  </div>
</template>

<script>
import BaseLootCard from "@/components/BaseLootCard";

export default {
  name: "SkinCard",
  components: {
    BaseLootCard,
  },
  props: {
    skin: {
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