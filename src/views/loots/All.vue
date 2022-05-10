<template>
  <div class="all-view-component">
    <Material />
    <Champion />
    <Skin />
    <Tactician />
    <Eternal />
    <Emote />
    <WardSkin />
    <Icon />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Material from '@/views/loots/Material.vue';
import Champion from '@/views/loots/Champion.vue';
import Skin from '@/views/loots/Skin.vue';
import Tactician from '@/views/loots/Tactician.vue';
import Eternal from '@/views/loots/Eternal.vue';
import Emote from '@/views/loots/Emote.vue';
import WardSkin from '@/views/loots/WardSkin.vue';
import Icon from '@/views/loots/Icon.vue';

export default defineComponent({
  name: 'All',
  components: {
    Material,
    Champion,
    Skin,
    Tactician,
    Eternal,
    Emote,
    WardSkin,
    Icon,
  },
});
</script>
