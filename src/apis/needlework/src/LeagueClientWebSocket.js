import NeedleworkConsole from "./NeedleworkConsole";
import { WS_OPCODES } from "./data/WebSocketOpcodes";

import WebSocket from "ws";

export default class LeagueClientWebSocket {
  constructor() {
    this.leagueClientAuthentication = null;
    this.ws = null;
  }

  async initialize(leagueClientAuthentication) {
    this.leagueClientAuthentication = leagueClientAuthentication;

    if (this.leagueClientAuthentication.token != null) {
      this.ws = this.setupWebSocket();
      this.setupWebSocketListeners();
    }
  }

  reinit() {
    if (this.ws != undefined) {
      this.ws.removeAllListeners("open");
      this.ws.removeAllListeners("close");
      this.ws.removeAllListeners("message");
    }

    this.ws = this.setupWebSocket();
    this.setupWebSocketListeners();
  }

  setupWebSocket() {
    const password = this.leagueClientAuthentication.token;
    const port = this.leagueClientAuthentication.port;
    const agent = this.leagueClientAuthentication.agent;
    const wsURL = `wss://riot:${password}@127.0.0.1:${port}/`;

    const webSocket = new WebSocket(wsURL, "wamp", {
      agent: agent,
    });

    return webSocket;
  }

  subscribe(topic, func) {
    this.ws.addListener(topic, func);
    this.ws.send(JSON.stringify([WS_OPCODES.SUBSCRIBE, topic]));
  }

  unsubscribe(topic, func) {
    this.ws.removeListener(topic, func);
    this.ws.send(JSON.stringify([WS_OPCODES.UNSUBSCRIBE, topic]));
  }

  setupWebSocketListeners() {
    const event = "OnJsonApiEvent";

    this.ws.addListener("open", () => {
      NeedleworkConsole.log("WebSocket opened! :3");
      this.subscribe(event, NeedleworkConsole.log);
    });

    this.ws.addListener("close", () => {
      NeedleworkConsole.log("WebSocket closed! :<");
      this.unsubscribe(event, NeedleworkConsole.log);
    });
  }

  handleMessageEvent(callback) {
    this.ws.on("message", callback);
  }
}
