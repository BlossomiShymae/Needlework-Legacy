<template>
  <div id="skin-card">
    <Suspense>
      <BaseLootCard
        :tileIconPath="skin.tilePath"
        :name="skin.itemDesc"
        :loot-name="skin.lootName"
        :type="skin.type"
        :count="skin.count"
      />
    </Suspense>
  </div>
</template>

<script>
import BaseLootCard from "@/components/loots/BaseLootCard";

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
};
</script>

<style>
</style>