import WebSocket from "ws";
const axios = require("axios");
const https = require("https");
const exec = require("child_process").execSync;
import paths from "../static/paths";
import DynamicFileService from "../services/DynamicFileService";

const WS_OPCODES = Object.freeze({
  WELCOME: 0,
  PREFIX: 1,
  CALL: 2,
  CALLRESULT: 3,
  CALLERROR: 4,
  SUBSCRIBE: 5,
  UNSUBSCRIBE: 6,
  PUBLISH: 7,
  EVENT: 8,
});

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

class LeagueClientAuth {
  static _instance = null;

  constructor() {
    if (LeagueClientAuth._instance) {
      return LeagueClientAuth._instance;
    }

    const _data = this.parseForWindows();

    this.auth = _data.auth;
    this.port = _data.port;
    this.token = _data.token;
    this.agent = null;

    LeagueClientAuth._instance = this;
  }

  async initialize() {
    this.agent = await this.createAgent();
  }

  isClientActive() {
    try {
      const cmd =
        "wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline";
      const stdout = exec(cmd);

      return !!stdout;
    } catch (error) {
      console.error(error);
    }
  }

  refreshAuth() {
    const _data = this.parseForWindows();

    this.auth = _data.auth;
    this.port = _data.port;
    this.token = _data.token;
  }

  parseForWindows() {
    try {
      const cmd =
        "wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline";
      const portRe = /(?<=--app-port=)([0-9]*)/g;
      const tokenRe = /(?<=--remoting-auth-token=)([\w-]*)/g;

      const stdout = exec(cmd);

      let _data = {};
      _data.port = portRe.exec(stdout)[0];
      _data.token = tokenRe.exec(stdout)[0];
      // Encode token for Riot Basic Authentication
      _data.auth = Buffer.from("riot:" + _data.token).toString("base64");

      NeedleworkConsole.log("Established authentication!");
      NeedleworkConsole.log(_data);

      return _data;
    } catch (error) {
      console.error(error);
    }
  }

  async createAgent() {
    const url = "https://static.developer.riotgames.com/docs/lol/riotgames.pem";
    const file = new DynamicFileService({
      url,
      responseType: "stream",
      filePath: paths.certificate,
    });

    const buffer = await file.toBuffer();

    return new https.Agent({ ca: buffer });
  }
}

class LeagueClientHTTPS {
  constructor() {
    this.leagueClientAuth = null;
    this.instance = null;
  }

  async initialize() {
    const auth = new LeagueClientAuth();
    await auth.initialize();
    this.leagueClientAuth = auth;

    this.instance = this.createInstance();
  }

  createInstance() {
    return axios.create({
      baseURL: "https://127.0.0.1:" + this.leagueClientAuth.port,
      timeout: 1000,
      headers: { authorization: "Basic " + this.leagueClientAuth.auth },
      httpsAgent: this.leagueClientAuth.agent,
    });
  }

  async fetch(api) {
    try {
      const response = await this.instance.get(api);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

class LeagueClientWebSocket {
  constructor() {
    this.leagueClientAuth = new LeagueClientAuth();
    this.OPCODES = WS_OPCODES;
    this.ws = this.setupWebSocket();

    this.ws.addListener("open", () => {
      NeedleworkConsole.log("WebSocket opened! :3");
      this.subscribe("/lol-store/v1/wallet", NeedleworkConsole.log);
    });

    this.ws.addListener("close", () => {
      NeedleworkConsole.log("WebSocket closed! :<");
      this.unsubscribe("/lol-store/v1/wallet", NeedleworkConsole.log);
    });
  }

  setupWebSocket() {
    const password = this.leagueClientAuth.token;
    const port = this.leagueClientAuth.port;
    const agent = this.leagueClientAuth.agent;
    const wsURL = `wss://riot:${password}@127.0.0.1:${port}/`;

    const ws = new WebSocket(wsURL, "wamp", {
      agent: agent,
    });

    return ws;
  }

  subscribe(topic, func) {
    this.ws.addListener(topic, func);
    this.ws.send(JSON.stringify[(this.OPCODES.SUBSCRIBE, topic)]);
  }

  unsubscribe(topic, func) {
    this.ws.removeListener(topic, func);
    this.ws.send(JSON.stringify[(this.OPCODES.UNSUBSCRIBE, topic)]);
  }
}

class NeedleworkConsole {
  static signature = "Needlework: ";
  static log(args) {
    if (args instanceof Object) {
      console.log(NeedleworkConsole.signature, args);
    } else {
      console.log(NeedleworkConsole.signature + args);
    }
  }
}
