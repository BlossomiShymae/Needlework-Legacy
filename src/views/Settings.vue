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
    <div id="settings-exit-area">
      <w-button id="exit-settings-button" @click="$router.push('/home')"
        >Exit</w-button
      >
    </div>
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
import { useStore } from "vuex";
import useSettings from "@/composables/useSettings";

const settingLinks = [
  {
    label: "General",
    id: "general",
    icon: "mdi mdi-information",
    route: "/settings/general",
  },
];

const store = useStore();
const { theme } = useSettings(store);
</script>

<style lang="scss" scoped>
#settings {
  background-color: v-bind("theme.backgroundColor");
  color: v-bind("theme.textColor");
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
  background-color: v-bind("theme.paletteColor[0]");
  margin: auto;
}

#settings-exit-area {
  display: flex;
  height: 10vh;
  justify-content: center;
  align-items: center;
}
</style>