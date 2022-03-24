import LeagueClientHTTPS from "./src/LeagueClientHTTPS";
import LeagueClientWebSocket from "./src/LeagueClientWebSocket";

export default class Needlework {
  constructor() {
    this.clientHTTPS = null;
    // this.clientWS = new LeagueClientWebSocket();
  }

  async initialize() {
    const https = new LeagueClientHTTPS();
    await https.initialize();
    this.clientHTTPS = https;
  }

  get currentSummoner() {
    return this.clientHTTPS.fetch("/lol-summoner/v1/current-summoner");
  }

  get wallet() {
    return this.clientHTTPS.fetch("/lol-store/v1/wallet");
  }

  get playerLootMap() {
    return this.clientHTTPS.fetch("/lol-loot/v1/player-loot-map");
  }
}
