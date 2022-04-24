<template>
  <div id="general-settings" class="settings-view-component">
    <h2 class="title2">General</h2>
    <h3 class="title3">Theme</h3>
    <w-select
      v-model="selectedTheme"
      :items="themeItems"
      no-unselect
    ></w-select>
    <w-checkbox v-model="darkMode">Enable dark mode</w-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "General",
});
</script>

<script setup lang="ts">
import useSettings from "@/composables/useSettings";

const { darkMode, selectedTheme, themeItems } = useSettings();
</script>

<style lang="scss" scoped>
</style>