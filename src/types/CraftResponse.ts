import type { PlayerLoot } from "@/types/PlayerLoot";

type Crafted = {
  deltaCount?: number;
  playerLoot?: PlayerLoot;
};

export type CraftResponse = {
  added?: Crafted[];
  redeemed?: Crafted[];
  removed?: Crafted[];
};
