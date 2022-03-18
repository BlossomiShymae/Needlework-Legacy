<template>
  <div id="chest-card">
    <Suspense>
      <BaseLootCard
        :tileIconPath="chest.tilePath"
        :name="lootName"
        :loot-name="rawName"
        :type="chest.type"
        :count="chest.count"
      />
    </Suspense>
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
  computed: {
    lootName() {
      if (this.chest?.lootName.includes("Mastery")) {
        return `${this.chest?.lootName} ${this.chest?.itemDesc}`;
      }
      if (this.chest?.localizedName) {
        return this.chest.localizedName;
      }
      if (this.chest?.lootId === "MATERIAL_key_fragment") {
        if (this.chest?.count > 1) return "Key Fragments";
        return "Key Fragment";
      }
      return this.chest?.lootName ?? "Unknown Material, Contact Dev";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>