import fs from "fs";
import path from "path";
const axios = require("axios");
const https = require("https");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { app } = require("electron");

export default class NeedleworkLCU {
  constructor() {
    this.port = null;
    this.authToken = null;
    this.instance = null;

    this.setupForWin();
  }

  get currentSummoner() {
    return this.fetch("/lol-summoner/v1/current-summoner");
  }

  get wallet() {
    return this.fetch("/lol-store/v1/wallet");
  }

  get playerLootMap() {
    return this.fetch("/lol-loot/v1/player-loot-map");
  }

  async fetch(api) {
    try {
      const response = await this.instance.get(api);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async setupForWin() {
    const winCmd =
      "wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline";

    const portRegEx = /(?<=--app-port=)([0-9]*)/g;
    const authTokenRegEx = /(?<=--remoting-auth-token=)([\w-]*)/g;

    try {
      const { stdout, stderr } = await exec(winCmd);

      this.port = portRegEx.exec(stdout)[0];
      this.authToken = authTokenRegEx.exec(stdout)[0];

      // Encode token to Base64
      this.authToken = Buffer.from("riot:" + this.authToken).toString("base64");

      console.log("Needlework: Port and token authorization were found!");
      console.log("Needlework: Port - " + this.port);
      console.log("Needlework: Token - " + this.authToken);

      this.setupInstance();
    } catch (error) {
      console.error(error);
    }
  }

  setupInstance() {
    const dataPath = app.getPath("userData");
    const dirPath = path.join(dataPath, "data");
    const certPath = path.join(dataPath, "data", "riotgames.pem");

    const createInstance = () => {
      this.instance = axios.create({
        baseURL: "https://127.0.0.1:" + this.port,
        timeout: 1000,
        headers: { authorization: "Basic " + this.authToken },
        httpsAgent: new https.Agent({
          ca: fs.readFileSync(certPath),
        }),
      });
    };

    console.log("Needlework: Certificate Path - " + certPath);

    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      // Check if cached certificate is missing
      if (!fs.existsSync(certPath)) {
        // Get certificate
        const certUrl =
          "https://static.developer.riotgames.com/docs/lol/riotgames.pem";
        const file = fs.createWriteStream(certPath);

        const request = https.get(certUrl, (response) => {
          response.pipe(file);
        });

        // Wait for certificate to be created before setting instance
        file.on("finish", () => {
          createInstance();
        });
      } else {
        createInstance();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
