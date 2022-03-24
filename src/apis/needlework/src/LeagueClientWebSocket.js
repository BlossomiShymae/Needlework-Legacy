import NeedleworkConsole from "./NeedleworkConsole";
import LeagueClientAuth from "./LeagueClientAuth";

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
