<template>
  <Transition name="fade-transition">
    <slot></slot>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FadeTransition',
});
</script>

<style lang="scss">
.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity 2s ease-in-out;
}

.fade-transition-enter-from,
.fade-transition-leave-to {
  opacity: 0;
}
</style>
