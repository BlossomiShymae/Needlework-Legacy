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

<script lang="ts">
import { defineComponent } from "vue";
import SummonerHorizontalCard from "@/components/SummonerHorizontalCard.vue";
import HextechStatusCard from "@/components/HextechStatusCard.vue";
import LootButtonCard from "@/components/LootButtonCard.vue";

export default defineComponent({
  name: "LootMetaPanel",
  components: {
    SummonerHorizontalCard,
    HextechStatusCard,
    LootButtonCard,
  },
});
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