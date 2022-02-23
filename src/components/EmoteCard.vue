<template>
  <div id="emote-card">
    <BaseLootCard
    :src="src"
    :name="emote.itemDesc"
    :loot-name="emote.lootName"
    :type="emote.type"
    :count="emote.count"
     />
  </div>
</template>

<script>
import BaseLootCard from '@/components/BaseLootCard';

export default {
  name: "EmoteCard",
  components: {
    BaseLootCard
  },
  props: {
    emote: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      src: "local-resource://./src/assets/riot_static/rcp-fe-lol-loot/chest_115.png",
    }
  }
}
</script>

<style>

</style>