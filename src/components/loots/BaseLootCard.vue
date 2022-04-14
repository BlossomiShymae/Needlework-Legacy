<template>
  <w-menu arrow left shadow id="base-loot-card">
    <template #activator="{ on }">
      <div class="loot-item" v-on="on">
        <img :src="tileIcon" class="tile-icon shimmer" />
        <div class="icon-overlay"></div>
        <p class="loot-count">x{{ count }}</p>
      </div>
    </template>
    <div class="text-left lh2" id="menu">
      <p class="title4 text-bold text-upper">{{ name }}</p>
      <p class="title5">{{ lootName }}</p>
      <p class="body capitalize">{{ type }}</p>

      <w-divider class="full-width my2"></w-divider>

      <div id="menu-actions">
        <div v-if="canOpen">
          <div class="action"><p>Open</p></div>
        <div class="action"><p>Open by amount</p></div>
        <div class="action">
          <p>Open all <span class="caption">"Snip snip!"</span></p>
        </div>
        </div>
        
      </div>
    </div>
  </w-menu>
</template>

<script>
import { toRefs } from "vue";
import useTileIcon from "@/composables/useTileIcon";
import store from "@/store/index";
import useSettings from "@/composables/useSettings";

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
    canOpen: {
      type: Boolean,
      required: true
    }
  },
  async setup(props) {
    const { tileIconPath } = toRefs(props);

    const { tileIcon } = await useTileIcon(tileIconPath);

    const { theme } = useSettings(store);

    return {
      tileIcon,
      theme,
    };
  },
};
</script>

<style lang="scss" scoped>
.caption {
  color: v-bind("theme.textColor");
}
.loot-item {
  --card-border-radius: 0.5rem;
  --card-width: 100px;
  --card-height: 100px;

  position: relative;
  width: var(--card-width);
  height: var(--card-height);

  .tile-icon {
    position: absolute;
    height: var(--card-height);
    width: var(--card-width);
    top: 0;
    left: 0;

    border-radius: var(--card-border-radius);
    image-rendering: -webkit-optimize-contrast;
    z-index: 97;
  }

  .icon-overlay {
    position: absolute;
    height: var(--card-height);
    width: var(--card-width);
    top: 0;
    left: 0;

    border-radius: var(--card-border-radius);
    box-shadow: 2px 2px 8px inset black;
    z-index: 98;
  }

  .loot-count {
    position: absolute;
    font-size: 1rem;
    color: white;
    font-family: "Consolas", sans-serif;
    font-weight: bold;
    text-shadow: 2px 2px 2px #000, -1px -1px 2px #000, 1px -1px 0 #000,
      -1px 1px 0 #000, 1px 1px 0 #000, 2px 2px 2px #000, -1px -1px 2px #000,
      1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    padding: 6px;
    right: 0;
    bottom: 0;
    border-radius: 50% 0 var(--card-border-radius) 0;
    z-index: 99;
  }

  #menu-actions {
    .action {
      background-color: v-bind("theme.backgroundColor");
      color: v-bind("theme.textColor");
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