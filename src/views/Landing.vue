<template>
  <div class="landing">
    <w-flex column class="full-width justify-center align-center" gap="4">
      <h2 class="title2 text-bold">Needlework</h2>
      <h3 class="title3">
        Little hextech crafting helper program. Powered by love, bees, and
        kitties.
      </h3>
      <h4 class="title4">
        Needlework isn't endorsed by Riot Games and doesn't reflect the views or
        opinions of Riot Games or anyone officially involved in producing or
        managing Riot Games properties. Riot Games, and all associated
        properties are trademarks or registered trademarks of Riot Games, Inc.
      </h4>
    </w-flex>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Landing",
});
</script>

<script setup lang="ts">
import { IChannel } from "@/channels";
import router from "@/router";

const isClientActive = window.ipcRenderer.invoke(IChannel.isClientActive);
isClientActive.then((active) => {
  setTimeout(() => {
    if (active === true) router.push("/home");
    if (active === false) router.push("/inactive");
  }, 5000);
});
</script>

<style lang="scss" scoped>
.landing,
.w-flex {
  width: 100%;
  height: 100vh;
}
</style>
