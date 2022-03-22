<template>
  <div id="eternal-card">
    <Suspense>
      <BaseLootCard
        :tileIconPath="eternal.tilePath"
        :name="eternal.localizedName"
        :loot-name="eternal.lootName"
        :type="eternal.type"
        :count="eternal.count"
      />
    </Suspense>
  </div>
</template>

<script>
import BaseLootCard from "@/components/loots/BaseLootCard";

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
};
</script>

<style>
</style>