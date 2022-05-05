import NeedleworkConsole from "./NeedleworkConsole";
import { WS_OPCODES } from "./data/WebSocketOpcodes";

import WebSocket from "ws";
import LeagueClientAuth from "./LeagueClientAuth";

export default class LeagueClientWebSocket {
  leagueClientAuthentication: null | LeagueClientAuth;
  ws: null | WebSocket;

  constructor() {
    this.leagueClientAuthentication = null;
    this.ws = null;
  }

  async initialize(leagueClientAuthentication: LeagueClientAuth) {
    this.leagueClientAuthentication = leagueClientAuthentication;

    if (this.leagueClientAuthentication.token != null) {
      this.ws = this.setupWebSocket();
      this.setupWebSocketListeners();
    }
  }

  reinit() {
    if (this.ws != undefined) {
      this.close();
    }

    this.ws = this.setupWebSocket();
    this.setupWebSocketListeners();
  }

  close() {
    const events = ["open", "close", "message"];
    for (const event of events) {
      this.ws?.removeAllListeners(event);
    }
  }

  setupWebSocket() {
    const password = this.leagueClientAuthentication?.token;
    const port = this.leagueClientAuthentication?.port;
    const agent = this.leagueClientAuthentication?.agent ?? false;
    const wsURL = `wss://riot:${password}@127.0.0.1:${port}/`;

    const webSocket = new WebSocket(wsURL, "wamp", {
      agent: agent,
    });

    return webSocket;
  }

  subscribe(topic: string, func: (...args: any) => void) {
    this.ws?.addListener(topic, func);
    this.ws?.send(JSON.stringify([WS_OPCODES.SUBSCRIBE, topic]));
  }

  unsubscribe(topic: string, func: (...args: any) => void) {
    this.ws?.removeListener(topic, func);
    this.ws?.send(JSON.stringify([WS_OPCODES.UNSUBSCRIBE, topic]));
  }

  setupWebSocketListeners() {
    const event = "OnJsonApiEvent";

    this.ws?.addListener("open", () => {
      NeedleworkConsole.log("WebSocket opened! :3");
      this.subscribe(event, NeedleworkConsole.log);
    });

    this.ws?.addListener("close", () => {
      NeedleworkConsole.log("WebSocket closed! :<");
      this.unsubscribe(event, NeedleworkConsole.log);
    });
  }

  handleMessageEvent(callback: (...args: any) => void) {
    this.ws?.on("message", callback);
  }
}
