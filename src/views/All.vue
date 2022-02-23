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

<script>
import Material from "@/views/Material";
import Champion from "@/views/Champion";
import Skin from "@/views/Skin";
import Tactician from "@/views/Tactician";
import Eternal from "@/views/Eternal";
import Emote from "@/views/Emote";
import WardSkin from "@/views/WardSkin";
import Icon from "@/views/Icon";

export default {
  name: "All",
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
};
</script>

<style lang="scss" scoped>
</style>