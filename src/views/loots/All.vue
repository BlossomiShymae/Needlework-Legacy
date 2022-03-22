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
import Material from "@/views/loots/Material";
import Champion from "@/views/loots/Champion";
import Skin from "@/views/loots/Skin";
import Tactician from "@/views/loots/Tactician";
import Eternal from "@/views/loots/Eternal";
import Emote from "@/views/loots/Emote";
import WardSkin from "@/views/loots/WardSkin";
import Icon from "@/views/loots/Icon";

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