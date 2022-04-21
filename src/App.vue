<template>
  <w-app>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback> Loading... uwu </template>
        </Suspense>
      </transition>
    </router-view>
  </w-app>
</template>

<script setup>
import { useStore } from "vuex";
import router from "@/router";
import useSettings from "@/composables/useSettings";
import routes from "./apis/needlework/src/data/routes";

const store = useStore();
const { theme } = useSettings(store);

window.ipcRenderer.receive("needlework-update", (uri) => {
  if (uri == routes.CLIENT_INACTIVE) {
    router.push("/inactive");
  }
});
</script>

<style lang="scss">
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

#app {
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
  transition: opacity 0.33s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.w-card {
  background-color: v-bind("theme.cardColor") !important;
}
</style>
