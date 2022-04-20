<template>
  <div id="eternal-card">
    <Suspense>
      <template #default>
        <div class="default-wrapper">
          <BaseLootCard
            :tileIconPath="eternal.tilePath"
            :name="eternal.localizedName"
            :loot-name="eternal.lootName"
            :type="eternal.type"
            :count="eternal.count"
            :can-open="true"
          />
          <div class="eternals-badge">
            {{ toRoman(eternal.tags.split("seriesNumber=")[1]) }}
          </div>
        </div>
      </template>
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

<script setup>
import store from "@/store/index";
import useSettings from "@/composables/useSettings";

function toRoman(num) {
  const roman = {
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let str = "";

  for (const i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
}

const { theme } = useSettings(store);
</script>

<style lang="scss" scoped>
$badge-width: 14px;
$badge-height: 16px;

.eternals-badge {
  position: relative;
  top: -$base-loot-card-height;
  right: calc(-#{$base-loot-card-width} - 4px);
  width: $badge-width;
  height: $badge-height;
  z-index: 99;
  background-color: v-bind("theme.cardColor");
  border-radius: 0.25rem;

  font-size: 0.875rem;
  color: white;
  font-family: "Consolas", sans-serif;
  font-weight: bold;
  text-shadow: 2px 2px 2px #000, -1px -1px 2px #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000, 2px 2px 2px #000, -1px -1px 2px #000,
    1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>