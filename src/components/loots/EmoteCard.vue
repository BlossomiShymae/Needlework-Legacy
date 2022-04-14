<template>
  <div id="emote-card">
    <Suspense>
      <BaseLootCard
        :tileIconPath="emote.tilePath"
        :name="emote.itemDesc"
        :loot-name="emote.lootName"
        :type="emote.type"
        :count="emote.count"
        :can-open="true"
      />
    </Suspense>
  </div>
</template>

<script>
import BaseLootCard from "@/components/loots/BaseLootCard";

export default {
  name: "EmoteCard",
  components: {
    BaseLootCard,
  },
  props: {
    emote: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>