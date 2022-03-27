import LeagueClientAuth from "./src/LeagueClientAuth";
import LeagueClientHTTPS from "./src/LeagueClientHTTPS";
import LeagueClientWebSocket from "./src/LeagueClientWebSocket";
import { ActiveState, InactiveState } from "./src/state";

export default class Needlework {
  constructor(pollPeriod) {
    this.clientAuthentication = null;
    this.clientHTTPS = null;
    this.clientWebSocket = null;
    this._pollInterval = null;
    this._pollPeriod = pollPeriod;
    this._state = null;
  }

  changeState(state) {
    this._state = state;
  }

  /**
   * Poll event loop that is delegated to  `_state`. See `ActiveState` and
   * `InactiveState` for implementation.
   */
  pollingEventLoop() {
    return this._state.pollingEventLoop();
  }

  setPollInterval() {
    this._pollInterval = setInterval(
      this.pollingEventLoop.bind(this),
      this._pollPeriod
    );
  }

  clearPollInterval() {
    clearInterval(this._pollInterval);
  }

  async _setupClientObject(clientObject) {
    const object = clientObject;
    await object.initialize();
    return object;
  }

  async _setupClientObjectWithAuthentication(clientObject) {
    const object = clientObject;
    await object.initialize(this.clientAuthentication);
    return object;
  }

  async initialize() {
    // Setup authentication instance for League Client
    this.clientAuthentication = await this._setupClientObject(
      new LeagueClientAuth()
    );

    // Setup HTTPS instance for League Client
    this.clientHTTPS = await this._setupClientObjectWithAuthentication(
      new LeagueClientHTTPS()
    );

    // Setup WebSocket instance for League Client
    this.clientWebSocket = await this._setupClientObjectWithAuthentication(
      new LeagueClientWebSocket()
    );

    // Start lifecycle state based on auth token
    const state = this.clientAuthentication.token
      ? new ActiveState(this)
      : new InactiveState(this);
    this.changeState(state);
    this._pollInterval = setInterval(
      this.pollingEventLoop.bind(this),
      this._pollPeriod
    );
  }

  /**
   * Getter for `currentSummoner` that is delegated to `_state`. See `ActiveState`
   * and `ActiveState` for implementation.
   */
  get currentSummoner() {
    return this._state.currentSummoner;
  }

  /**
   * Getter for `wallet` that is delegated to `_state`. See `ActiveState`
   * and `ActiveState` for implementation.
   */
  get wallet() {
    return this._state.wallet;
  }

  /**
   * Getter for `playerLootMap` that is delegated to `_state`. See `ActiveState`
   * and `ActiveState` for implementation.
   */
  get playerLootMap() {
    return this._state.playerLootMap;
  }
}
