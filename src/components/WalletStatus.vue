<template>
  <div id="wallet">
    <img
      src="local-resource://./src/assets/riot_static/icon-blue-essence.png"
      alt="Blue essence icon"
    />
    <p class="body">{{ wallet.ip }}</p>
    <p class="body ml1" style="color: green" v-if="beSum.disenchant">
      + {{ beSum.disenchant }}
    </p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "WalletStatus",
  props: {
    wallet: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    return {
      beSum: computed(() => store.getters.beSum),
    };
  },
};
</script>

<style lang="scss" scoped>
#wallet {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  img {
    image-rendering: -webkit-optimize-contrast;
    margin-right: 2px;
    width: 16px;
    height: auto;
  }
}
</style>