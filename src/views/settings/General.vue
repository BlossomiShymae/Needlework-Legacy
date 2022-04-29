<template>
  <div id="general-settings" class="settings-view-component theme-card-color">
    <h2 class="title2">General</h2>
    <h3 class="title3 text-bold">Theme</h3>
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

const { darkMode } = useSettings();
</script>

<style lang="scss" scoped></style>
