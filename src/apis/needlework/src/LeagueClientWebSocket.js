import NeedleworkConsole from "./NeedleworkConsole";

import WebSocket from "ws";

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

      this.ws.on("message", this.messageHandler);
    });

    this.ws.addListener("close", () => {
      NeedleworkConsole.log("WebSocket closed! :<");
      this.unsubscribe(event, NeedleworkConsole.log);
    });
  }

  messageHandler(message) {
    const jsonArray = JSON.parse(message);
    const opcode = jsonArray[0];
    const event = jsonArray[1];
    const dataObject = jsonArray[2];

    switch (opcode) {
      case WS_OPCODES.EVENT:
    }
  }
}
