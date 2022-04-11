<template>
  <div id="loot-meta-panel">
    <Suspense>
      <SummonerHorizontalCard />
    </Suspense>
    <Suspense>
      <HextechStatusCard />
    </Suspense>
    <LootButtonCard />
    <div></div>
  </div>
</template>

<script>
import SummonerHorizontalCard from "@/components/SummonerHorizontalCard";
import HextechStatusCard from "@/components/HextechStatusCard";
import LootButtonCard from "@/components/LootButtonCard";

export default {
  name: "LootMetaPanel",
  components: {
    SummonerHorizontalCard,
    HextechStatusCard,
    LootButtonCard,
  },
};
</script>

<script setup>
</script>

<style>
#loot-meta-panel {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows:
    minmax(0, 1fr)
    minmax(0, 1fr)
    minmax(min-content, max-content)
    minmax(0, 1fr);
  gap: 8px;

  padding: 20px;
}
</style>