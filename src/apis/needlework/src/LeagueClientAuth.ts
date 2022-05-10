import NeedleworkConsole from './NeedleworkConsole';
import paths from '@/static/paths';
import DynamicFileService from '@/services/DynamicFileService';
import { Agent } from 'https';

const exec = require('child_process').execSync;
const https = require('https');

export default class LeagueClientAuth {
  static _instance: LeagueClientAuth | null = null;
  auth?: null | string;
  port?: null | string;
  token?: null | string;
  agent?: null | Agent;

  constructor() {
    if (LeagueClientAuth._instance) {
      return LeagueClientAuth._instance;
    }

    this.auth = null;
    this.port = null;
    this.token = null;
    this.agent = null;

    if (this.isClientActive()) {
      NeedleworkConsole.log('Client is active!');
      const _data = this.getAuthForWindows();
      this.setAuthentication(_data);
    }

    LeagueClientAuth._instance = this;
  }

  async initialize() {
    this.agent = await this.createAgent();
  }

  setAuthentication({
    auth,
    port,
    token,
  }: {
    auth: string;
    port: string;
    token: string;
  }) {
    this.auth = auth;
    this.port = port;
    this.token = token;
  }

  isClientActive() {
    try {
      const cmd =
        "wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline 2> nul";
      const portRegExp = /(?<=--app-port=)([0-9]*)/g;
      const stdout = exec(cmd);
      const isActive = portRegExp.exec(stdout);

      return !!isActive;
    } catch (error) {
      console.error(error);
    }
  }

  refreshAuth() {
    const _data = this.getAuthForWindows();

    this.auth = _data.auth;
    this.port = _data.port;
    this.token = _data.token;
  }

  getAuthForWindows() {
    try {
      const cmd =
        "wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline";
      const portRe = /(?<=--app-port=)([0-9]*)/g;
      const tokenRe = /(?<=--remoting-auth-token=)([\w-]*)/g;

      const stdout = exec(cmd);

      const _data = {} as any;
      _data.port = portRe.exec(stdout)?.[0] ?? '';
      _data.token = tokenRe.exec(stdout)?.[0] ?? '';
      // Encode token for Riot Basic Authentication
      _data.auth = Buffer.from('riot:' + _data.token).toString('base64');

      NeedleworkConsole.log('Established authentication!');
      NeedleworkConsole.log(_data);

      return _data;
    } catch (error) {
      console.error(error);
    }
  }

  async createAgent() {
    const url = 'https://static.developer.riotgames.com/docs/lol/riotgames.pem';
    const file = new DynamicFileService({
      url,
      responseType: 'stream',
      filePath: paths.certificate,
    });

    const buffer = await file.toBuffer();

    return new https.Agent({ ca: buffer });
  }
}
