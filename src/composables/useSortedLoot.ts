import type { PlayerLoot } from "@/types/PlayerLoot";
import { Ref, ref, computed } from "vue";
import _ from "lodash";
import { Loot } from "@/enums/loot";

export default function useSortedLoot(loots: Ref<PlayerLoot[]>) {
  const sortedChests = (chestLoots: Ref<PlayerLoot[]>) => {
    const sortedLoots: Ref<PlayerLoot[]> = ref([]);
    const push = (array: Ref<PlayerLoot[]>, ...values: any[]) => {
      for (const value of values) {
        if (typeof value !== "undefined") array.value.push(value);
      }
      return array;
    };

    const championCaspules = _.find(loots.value, {
      lootId: Loot.LootId.CHAMPION_CAPSULE,
    } as PlayerLoot);
    const gloriousChampionCapsules = _.find(loots.value, {
      lootId: Loot.LootId.GLORIOUS_CHAMPION_CAPSULE,
    } as PlayerLoot);
    const gloriousChampionCapsulesMythic = _.find(loots.value, {
      lootId: Loot.LootId.GLORIOUS_CHAMPION_CAPSULE_MYTHIC,
    } as PlayerLoot);
    const mythicEssence = _.find(loots.value, {
      lootId: Loot.LootId.MYTHIC_ESSENCE,
    } as PlayerLoot);
    const keyFragments = _.find(loots.value, {
      lootId: Loot.LootId.KEY_FRAGMENT,
    } as PlayerLoot);
    push(
      sortedLoots,
      championCaspules,
      gloriousChampionCapsules,
      gloriousChampionCapsulesMythic,
      mythicEssence,
      keyFragments
    );

    let remainingUnsortedLoots = _.difference(loots.value, sortedLoots.value);
    const lootHas = (word: string) => (playerLoot: PlayerLoot) => {
      if (playerLoot.localizedName.toLowerCase().includes(word)) {
        return true;
      }
      if (playerLoot.lootName.toLowerCase().includes(word)) {
        if (playerLoot.lootName.toLowerCase().includes("_")) return false;
        return true;
      }
    };
    const capsules = remainingUnsortedLoots.filter(lootHas("capsule"));
    sortedLoots.value = _.concat(sortedLoots.value, capsules);

    remainingUnsortedLoots = _.difference(loots.value, sortedLoots.value);
    const chests = remainingUnsortedLoots.filter(lootHas("chest"));
    sortedLoots.value = _.concat(sortedLoots.value, chests);

    remainingUnsortedLoots = _.difference(loots.value, sortedLoots.value);
    const orbs = remainingUnsortedLoots.filter(lootHas("orb"));
    sortedLoots.value = _.concat(sortedLoots.value, orbs);

    remainingUnsortedLoots = _.difference(loots.value, sortedLoots.value);
    const emotes = remainingUnsortedLoots.filter(lootHas("emote"));
    sortedLoots.value = _.concat(sortedLoots.value, emotes);

    remainingUnsortedLoots = _.difference(loots.value, sortedLoots.value);
    const eggs = remainingUnsortedLoots.filter(lootHas("egg"));
    sortedLoots.value = _.concat(sortedLoots.value, eggs);

    remainingUnsortedLoots = _.difference(loots.value, sortedLoots.value);
    const lootHasTokens = (playerLoot: PlayerLoot) => {
      if (playerLoot.lootId.includes("CHAMPION_TOKEN")) return false;
      return lootHas("token")(playerLoot);
    };
    const tokens = remainingUnsortedLoots.filter(lootHasTokens);
    sortedLoots.value = _.concat(sortedLoots.value, tokens);

    remainingUnsortedLoots = _.difference(loots.value, sortedLoots.value);
    const shards = remainingUnsortedLoots.filter(lootHas("shard"));
    sortedLoots.value = _.concat(sortedLoots.value, shards);

    remainingUnsortedLoots = _.difference(loots.value, sortedLoots.value);
    remainingUnsortedLoots = _.sortBy(remainingUnsortedLoots, [
      "lootName",
      "itemDesc",
    ]);
    sortedLoots.value = _.concat(sortedLoots.value, remainingUnsortedLoots);

    return sortedLoots;
  };
  const sortedChampions = (championLoots: Ref<PlayerLoot[]>) => {
    const sortedLoots: Ref<PlayerLoot[]> = ref([]);
    sortedLoots.value = _.sortBy(championLoots.value, ["type", "itemDesc"]);

    return sortedLoots;
  };

  return {
    sortedChests: sortedChests(loots),
    sortedChampions: sortedChampions(loots),
  };
}
