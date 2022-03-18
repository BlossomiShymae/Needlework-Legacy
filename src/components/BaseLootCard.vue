<template>
  <w-menu arrow left shadow id="base-loot-card">
    <template #activator="{ on }">
      <div class="loot-item" v-on="on">
        <img :src="tileIcon" class="shimmer" />
        <p class="body loot-count">x{{ count }}</p>
      </div>
    </template>
    <div class="text-left lh2" id="menu">
      <p class="title4 text-bold text-upper">{{ name }}</p>
      <p class="title5">{{ lootName }}</p>
      <p class="body capitalize">{{ type }}</p>

      <w-divider class="full-width my2"></w-divider>

      <div id="menu-actions">
        <div class="action">Open</div>
        <div class="action">Open by amount</div>
        <div class="action">
          Open all <span class="caption">"Snip snip!"</span>
        </div>
      </div>
    </div>
  </w-menu>
</template>

<script>
import { toRefs } from "vue";
import useTileIcon from "@/composables/useTileIcon";

export default {
  name: "BaseLootCard",
  props: {
    tileIconPath: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    lootName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const { tileIconPath } = toRefs(props);

    const { tileIcon } = await useTileIcon(tileIconPath);

    return {
      tileIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.loot-item {
  --card-border-radius: 0.5rem;

  position: relative;
  width: 100px;
  height: 100px;
  background-color: $app-base-card-color;
  border-radius: var(--card-border-radius);
  box-shadow: 2px 2px 8px inset grey;

  img {
    position: relative;
    z-index: 10;
    image-rendering: -webkit-optimize-contrast;
    width: 95%;
    height: auto;
  }

  .loot-count {
    position: absolute;
    background-color: $app-palette-color3;
    padding: 6px;
    right: 0;
    bottom: 0;
    border-radius: 50% 0 var(--card-border-radius) 0;
  }

  #menu-actions {
    .action {
      background-color: white;
      padding: 4px;
      text-align: left;
      width: 100%;

      filter: brightness(100%);
      transition: filter 0.25s ease-in-out;

      &:hover {
        filter: brightness(87.5%);
      }
    }
  }

  .shimmer {
    animation: shimmer 6s infinite cubic-bezier(0.19, 1, 0.22, 1);
  }

  @keyframes shimmer {
    0% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.25);
    }
    100% {
      filter: brightness(1);
    }
  }
}
</style>