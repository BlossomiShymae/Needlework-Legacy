<template>
  <div id="window-button-bar">
    <button class="window-button" @click="minimizeWindow()">
      <w-icon>mdi mdi-window-minimize</w-icon>
    </button>
    <button class="window-button" @click="openSettings()">
      <w-icon>mdi mdi-cog</w-icon>
    </button>
    <button class="window-button" @click="exitApplication()">
      <w-icon>mdi mdi-close</w-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WindowButtonBar",
});
</script>

<script setup lang="ts">
import router from "@/router";
import { IChannel } from "@/channels";
import useSettings from "@/composables/useSettings";

function minimizeWindow() {
  window.ipcRenderer.invoke(IChannel.minimizeWindow);
}

function openSettings() {
  router.push("/settings");
}

function exitApplication() {
  window.ipcRenderer.invoke(IChannel.exitApplication);
}

const { theme } = useSettings();
</script>

<style lang="scss" scoped>
#window-button-bar {
  position: absolute;
  top: -2px;
  right: 0;
  z-index: 9999;
  height: $window-button-bar-height;
  background-color: transparent;

  .window-button {
    height: inherit;
    width: 36px;
    background-color: v-bind("theme.cardColor");
    color: v-bind("theme.textColor");
    border: 0;

    &:first-of-type {
      border-radius: 0 0 0 20px;
    }

    &:hover {
      filter: invert(1);
    }
  }
}
</style>
