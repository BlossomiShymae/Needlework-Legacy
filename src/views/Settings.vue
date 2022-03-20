<template>
  <div id="settings">
    <WindowButtonBar />
    <w-button id="exit-settings-button" @click="$router.push('/home')"
      >Exit</w-button
    >
  </div>
</template>

<script>
import WindowButtonBar from "@/components/controls/WindowButtonBar";

export default {
  name: "Settings",
  components: {
    WindowButtonBar,
  },
};
</script>

<style lang="scss" scoped>
#settings {
}
#exit-settings-button {
  background-color: $app-palette-color1;
}
</style>