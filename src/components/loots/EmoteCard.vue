<template>
  <div id="emote-card">
    <Suspense>
      <BaseLootCard
        :tileIconPath="emote.tilePath"
        :name="emote.itemDesc"
        :loot-name="emote.lootName"
        :type="emote.type"
        :count="emote.count"
        :can-open="true"
        :loot="emote"
      />
      <template #fallback>
        <LoadingLootBeeMad />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseLootCard from "@/components/loots/BaseLootCard.vue";
import LoadingLootBeeMad from "@/components/fallbacks/LoadingLootBeeMad.vue";


export default defineComponent({
  name: "EmoteCard",
  components: {
    BaseLootCard,
    LoadingLootBeeMad
  },
});
</script>

<script setup lang="ts">
import { defineProps } from "vue";
import type { PlayerLoot } from '@/types/PlayerLoot';

const props = defineProps<{
  emote: PlayerLoot
}>();
</script>

<style>
</style>