<template>
  <w-app>
    <WindowButtonBar />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback></template>
        </Suspense>
      </transition>
    </router-view>
  </w-app>
</template>

<script lang="ts">
import WindowButtonBar from "@/components/controls/WindowButtonBar.vue";
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<script setup lang="ts">
import { RChannel, IChannel } from "@/channels";
import router from "@/router";
import routes from "./apis/needlework/src/data/routes";
import useSettings from "@/composables/useSettings";

// Initialize global application state for settings
function setupSettingsState() {
  const settingsStatePromise = window.ipcRenderer.invoke(IChannel.getStore);
  const { setStore, getStore } = useSettings();
  settingsStatePromise.then((settingsState: any) => {
    if (typeof settingsState !== "undefined") {
      const state = getStore() as any;
      for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(settingsState, key)) {
          if (
            typeof settingsState[key] !== "undefined" &&
            settingsState[key] !== null
          ) {
            state[key] = settingsState[key];
          }
        }
      }
      setStore(state);
    }
  });
}
setupSettingsState();

const { theme } = useSettings();

window.ipcRenderer.receive(RChannel.needleworkUpdate, (uri: any) => {
  if (uri == routes.PRESHUTDOWN_BEGIN || uri == routes.CLIENT_INACTIVE) {
    router.push("/inactive");
  }
});
</script>

<style lang="scss">
.theme-bg-color {
  background-color: v-bind("theme.backgroundColor");
}
.theme-frame-color {
  background-color: v-bind("theme.frameColor");
}
.theme-card-color {
  background-color: v-bind("theme.cardColor");
}
.theme-text-color {
  color: v-bind("theme.textColor");
}
.theme-button {
  background-color: v-bind("theme.paletteColor[0]") !important;
  color: white !important;
}

@import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");
html {
  box-sizing: border-box;
  overflow-y: hidden;
}

h1,
h2,
h3,
h4,
h5,
p,
span {
  color: v-bind("theme.textColor");
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

#app,
.w-app {
  font-family: "Oxygen", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: v-bind("theme.backgroundColor");
  color: v-bind("theme.textColor");
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.w-card {
  background-color: v-bind("theme.cardColor") !important;
  color: v-bind("theme.textColor") !important;
}

.w-input__input,
.w-input__input-wrap,
.w-input,
.w-checkbox__label {
  color: v-bind("theme.textColor") !important;
}
</style>
