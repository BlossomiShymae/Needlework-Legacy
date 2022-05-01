<template>
  <div class="loading-loot-bee-mad">
    <img
      src="local-resource://./src/assets/emotes/bee_mad.webp"
      class="bee-img"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingLootBeeMad",
});
</script>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.loading-loot-bee-mad {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bee-img {
  width: 87.5%;
  height: auto;
}
</style>
