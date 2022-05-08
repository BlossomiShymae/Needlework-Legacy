const routes = Object.freeze({
  CURRENT_SUMMONER: "/lol-summoner/v1/current-summoner",
  CURRENT_SUMMONER_JWT: "/lol-summoner/v1/current-summoner/jwt",
  WALLET: "/lol-store/v1/wallet",
  PLAYER_LOOT_MAP: "/lol-loot/v1/player-loot-map",
  LOL_LOOT_READY: "/lol-loot/v1/ready",
  CLIENT_INACTIVE: "CLIENT-INACTIVE",
  CLIENT_ACTIVE: "CLIENT-ACTIVE",
  CONTEXT_MENU_PREPEND: "/lol-loot/v1/player-loot/",
  CONTEXT_MENU_APPEND: "/context-menu",
  CRAFT_PREPEND: "/lol-loot/v1/recipes/",
  CRAFT_APPEND: "/craft",
  PRESHUTDOWN_BEGIN: "/riotclient/pre-shutdown/begin",
});

export default routes;
