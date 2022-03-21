<template>
  <div id="general-settings" class="settings-view-component">
    <h2 class="title2">General</h2>
    <h3 class="title3">Theme</h3>
    <w-checkbox v-model="darkMode">Enable dark mode</w-checkbox>
  </div>
</template>

<script>
export default {
  name: "General",
};
</script>

<script setup>
import { useStore } from "vuex";
import useSettings from "@/composables/useSettings";

const store = useStore();

const { darkMode } = useSettings(store);
</script>

<style lang="scss" scoped>
</style>