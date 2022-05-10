<template>
  <div class="settings-view-component theme-card-color" id="data-settings">
    <h2 class="title2">Data</h2>
    <h3 class="title3 text-bold">Image Cache</h3>
    <div class="settings-group-button-flex">
      <div>
        <p>
          Clear local image cache of loots, profile icons, etc. Useful for when
          a champion gets a new splash art.
        </p>
        <p>
          Image cache size: {{ (imageCacheSize / 1024 ** 2).toFixed(2) }} MB
        </p>
      </div>
      <w-button class="theme-button settings-button" @click="clearImageCache()"
        >Clear image cache</w-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Data',
});
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { IChannel } from '@/channels';

const imageCacheSize = ref(
  await window.ipcRenderer.invoke(IChannel.getImageCacheSize)
);

const clearImageCache = async () => {
  await window.ipcRenderer.invoke(IChannel.clearImageCache);
  imageCacheSize.value = await window.ipcRenderer.invoke(
    IChannel.getImageCacheSize
  );
};
</script>

<style lang="scss" scoped></style>
