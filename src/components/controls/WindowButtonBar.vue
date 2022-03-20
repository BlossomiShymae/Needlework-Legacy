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

<script>
export default {
  name: "WindowButtonBar",
};
</script>

<script setup>
import router from "@/router";

function minimizeWindow() {
  window.ipcRenderer.invoke("app-minimize-window");
}

function openSettings() {
  router.push("/settings");
}

function exitApplication() {
  window.ipcRenderer.invoke("app-exit-application");
}
</script>

<style lang="scss" scoped>
#window-button-bar {
  position: absolute;
  top: -1px;
  right: 0;
  z-index: 9999;
  background-color: transparent;

  .window-button {
    width: 36px;
    height: 20px;
    background-color: $app-base-card-color;
    color: $app-palette-color1;
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