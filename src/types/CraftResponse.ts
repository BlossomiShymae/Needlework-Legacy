import type { PlayerLoot } from "@/types/PlayerLoot";

export type Crafted = {
  deltaCount?: number;
  playerLoot?: PlayerLoot;
};

export type FlattenCrafted = Crafted & {
  craftType: "added" | "redeemed" | "removed";
};

export type CraftResponse = {
  added?: Crafted[];
  redeemed?: Crafted[];
  removed?: Crafted[];
};
