<template>
  <div class="content-card mt2 mb4 pa2 sh1 bdrs2">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentCard",
});
</script>

<script setup lang="ts">
import useSettings from "@/composables/useSettings";

const { theme } = useSettings();
</script>

<style lang="scss" scoped>
.content-card {
  background-color: v-bind("theme.cardColor");
  width: 98%;
  text-align: left;
}
</style>