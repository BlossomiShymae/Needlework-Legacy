<template>
  <div id="champion-card">
    <Suspense>
      <BaseLootCard
        :tileIconPath="champion.tilePath"
        :name="champion.itemDesc"
        :loot-name="champion.lootName"
        :type="champion.type"
        :count="champion.count"
        :can-open="true"
      />
    </Suspense>
  </div>
</template>

<script>
import BaseLootCard from "@/components/loots/BaseLootCard";

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
};
</script>

<style>
</style>