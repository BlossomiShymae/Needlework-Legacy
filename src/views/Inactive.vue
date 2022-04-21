<template>
  <div id="inactive">
    <img
      src="local-resource://./src/assets/emotes/bee_sad.webp"
      class="emote-img"
    />
    <p class="text-bold">
      Oh no... we lost connection with the League Client. ;w;
    </p>
  </div>
</template>

<script>
import routes from "@/apis/needlework/src/data/routes";
import router from "@/router";
import { useStore } from "vuex";
import useSettings from "@/composables/useSettings";
export default {
  name: "Inactive",
};
</script>

<script setup>
let isClientActive = false;

const store = useStore();
const { theme } = useSettings(store);

window.ipcRenderer.receive("needlework-update", (uri) => {
  if (uri === routes.CLIENT_ACTIVE) {
    isClientActive = true;
  }
  if (uri === routes.LOL_LOOT_READY && isClientActive) {
    router.push("/home");
    isClientActive = false;
  }
});
</script>

<style lang="scss" scoped>
#inactive {
  height: 100vh;
  background-color: v-bind("theme.backgroundColor");
  color: v-bind("theme.textColor");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .emote-img {
    margin-bottom: 32px;
  }
}
</style>