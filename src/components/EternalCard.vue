<template>
  <div id="eternal-card">
    <BaseLootCard
      :src="src"
      :name="eternal.localizedName"
      :loot-name="eternal.lootName"
      :type="eternal.type"
      :count="eternal.count"
    />
  </div>
</template>

<script>
import BaseLootCard from "@/components/BaseLootCard";

export default {
  name: "EternalCard",
  components: {
    BaseLootCard,
  },
  props: {
    eternal: {
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