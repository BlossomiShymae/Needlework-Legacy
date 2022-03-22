<template>
  <div class="content-card mt2 mb4 pa2 sh1 bdrs2">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContentCard",
};
</script>

<script setup>
import useSettings from "@/composables/useSettings";
import { useStore } from "vuex";

const store = useStore();
const { theme } = useSettings(store);
</script>

<style lang="scss" scoped>
.content-card {
  background-color: v-bind("theme.cardColor");
  width: 98%;
  text-align: left;
}
</style>