<template>
  <div id="settings">
    <WindowButtonBar />
    <div id="settings-grid">
      <w-list id="settings-routes" :items="settingLinks" nav color="primary">
        <template #item="{ item }">
          <span>{{ item.label }}</span>
          <div class="spacer"></div>
          <w-icon md>{{ item.icon }}</w-icon>
        </template>
      </w-list>
      <router-view />
    </div>

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

<script setup>
const settingLinks = [
  {
    label: "General",
    id: "general",
    icon: "mdi mdi-information",
    route: "/settings/general",
  },
];
</script>

<style lang="scss" scoped>
#settings {
  background-color: transparent;
  z-index: 10;
  height: 100%;
  width: 100%;
}

#settings-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr;
  overflow: hidden;
  height: 90vh;
}

#settings-routes {
  overflow-y: auto;
}

#exit-settings-button {
  background-color: $app-palette-color1;
  margin: 0;
  margin-top: 15px;
}
</style>