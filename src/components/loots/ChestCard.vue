<template>
  <div id="chest-card">
    <Suspense>
      <template #default>
        <div class="default-wrapper">
          <BaseLootCard
            :tileIconPath="chest.tilePath"
            :name="lootName"
            :loot-name="rawName"
            :type="chest.type"
            :count="chest.count"
            :can-open="canOpen"
          />
          <div
            class="mastery-token-6-badge mastery-badge"
            v-if="isMasteryToken6"
          ></div>
          <div
            class="mastery-token-7-badge mastery-badge"
            v-if="isMasteryToken7"
          ></div>
        </div>
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script>
import BaseLootCard from "@/components/loots/BaseLootCard";

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
      canOpen: true,
      isMasteryToken6: false,
      isMasteryToken7: false,
    };
  },
  mounted() {
    if (this.chest?.lootName?.includes("Mastery 6"))
      this.isMasteryToken6 = true;
    if (this.chest?.lootname?.includes("Mastery 7"))
      this.isMasteryToken7 = true;

    const materialBlacklist = ["token", "essence"];

    materialBlacklist.forEach((name) => {
      if (
        this.chest?.lootName.toLowerCase().includes(name) ||
        this.chest?.localizedName.toLowerCase().includes(name)
      ) {
        this.canOpen = false;
        return true;
      }
    });
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
      if (this.chest?.lootName === "CHEST_212") {
        return "Glorious Champion Capsule - Gemstone";
      }
      return this.chest?.lootName ?? "Unknown Material, Contact Dev";
    },
  },
};
</script>

<style lang="scss" scoped>
$badge-width: 12px;
$badge-height: 12px;

.mastery-badge {
  position: relative;
  top: -$base-loot-card-height;
  right: calc(-#{$base-loot-card-width} - 4px);
  width: $badge-width;
  height: $badge-height;
  z-index: 99;
}

.mastery-token-6-badge {
  $token-color: purple;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: $token-color;
}

.mastery-token-7-badge {
  $token-color: aqua;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background-color: $token-color;
}
</style>