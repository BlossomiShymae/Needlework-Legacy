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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Inactive",
});
</script>

<script setup lang="ts">
import routes from "@/apis/needlework/src/data/routes";
import router from "@/router";
import { RChannel } from "@/channels";
import useSettings from "@/composables/useSettings";

let isClientActive = false;

const { theme } = useSettings();

window.ipcRenderer.receive(RChannel.needleworkUpdate, (uri: any) => {
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
