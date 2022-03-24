import NeedleworkConsole from "./NeedleworkConsole";
import paths from "@/static/paths";
import DynamicFileService from "@/services/DynamicFileService";

const exec = require("child_process").execSync;
const https = require("https");

export default class LeagueClientAuth {
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
