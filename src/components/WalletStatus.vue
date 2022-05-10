<template>
  <div id="wallet">
    <img
      src="@/assets/riot_static/icon-blue-essence.png"
      alt="Blue essence icon"
    />
    <p class="body">{{ wallet.ip }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WalletStatus',
});
</script>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { WalletDTO } from '@/types/WalletDTO';

// eslint-disable-next-line no-unused-vars
const props = defineProps<{
  wallet: WalletDTO;
}>();
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
