import fs from "fs";
import path from "path";
import WebSocket from "ws";
const axios = require("axios");
const https = require("https");
const exec = require("child_process").execSync;
const { app } = require("electron");

export default class NeedleworkLCU {
  constructor() {
    this.clientHTTPS = new LeagueClientHTTPS();
    this.ws = null;
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

  setupWebSocket(port, password) {
    const wsAddress = "wss://riot:" + password + "@127.0.0.1:" + port + "/";

    console.log("Needlework: Setting up web socket...");
    const ws = new WebSocket(wsAddress, "wamp", {
      agent: this.agent,
    });

    ws.addEventListener("open", () => {
      console.log("Needlework - Established websocket");
      ws.send(JSON.stringify([5, "OnJsonApiEvent"]));
    });

    ws.addEventListener("message", (event) => {
      console.log("Needlework - ws event !!!", event.data);
    });

    ws.addEventListener("error", (event) => {
      console.error(event);
    });

    ws.addEventListener("close", (event) => {
      console.log(event);
    });

    this.ws = ws;
  }
}

class LeagueClientAuth {
  constructor() {
    const _data = this.parseForWindows();

    this.auth = _data.auth;
    this.port = _data.port;
    this.token = _data.token;

    this.agent = this.createAgent();
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

      return _data;
    } catch (error) {
      console.error(error);
    }
  }

  createAgent() {
    const paths = {
      data: app.getPath("userData"),
      dir: path.join(app.getPath("userData"), "data"),
      cert: path.join(app.getPath("userData"), "data", "riotgames.pem"),
    };
    const agent = (path) => {
      return new https.Agent({ ca: fs.readFileSync(path) });
    };

    try {
      if (!fs.existsSync(paths.dir)) {
        fs.mkdirSync(paths.dir);
      }

      // Check if cached certificate is missing
      if (!fs.existsSync(paths.cert)) {
        // Get certificate
        const certificateURL =
          "https://static.developer.riotgames.com/docs/lol/riotgames.pem";
        const wfile = fs.createWriteStream(paths.cert);
        const request = https.get(certificateURL, (response) => {
          response.pipe(wfile);
        });

        wfile.on("finish", () => {
          return agent(paths.cert);
        });
      } else {
        return agent(paths.cert);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

class LeagueClientHTTPS {
  constructor() {
    this.leagueClientAuth = new LeagueClientAuth();
    this.https = axios;
    this.instance = this.createInstance();
  }

  createInstance() {
    return this.https.create({
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
