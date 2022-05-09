export namespace Loot {
  export enum DisplayCategories {
    CHAMPION = "CHAMPION",
    ETERNALS = "ETERNALS",
    CHEST = "CHEST",
    EMOTE = "EMOTE",
    SKIN = "SKIN",
    SUMMONER_ICON = "SUMMONERICON",
    WARD_SKIN = "WARD_SKIN",
    COMPANION = "COMPANION",
    OTHER = "OTHER",
    NONE = "",
  }
  export enum Rarity {
    DEFAULT = "DEFAULT",
    EPIC = "EPIC",
    LEGENDARY = "LEGENDARY",
    MYTHIC = "MYTHIC",
    ULTIMATE = "ULTIMATE",
  }
  export enum LootId {
    RP = "CURRENCY_RP",
    BLUE_ESSENCE = "CURRENCY_champion",
    MYTHIC_ESSENCE = "CURRENCY_mythic",
    ORANGE_ESSENCE = "CURRENCY_cosmetic",
    CLASH_TICKETS = "MATERIAL_clashtickets",
    KEY_FRAGMENT = "MATERIAL_key_fragment",
    KEY = "MATERIAL_key",
    GLORIOUS_CHAMPION_CAPSULE_MYTHIC = "CHEST_212",
    GLORIOUS_CHAMPION_CAPSULE = "CHEST_129",
    CHAMPION_CAPSULE = "CHEST_128",
  }
  export enum Type {
    CHAMPION_PERMANENT = "CHAMPION",
    CHAMPION_SHARD = "CHAMPION_RENTAL",
  }
}
