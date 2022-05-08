import LeagueClientAuth from "./src/LeagueClientAuth";
import LeagueClientHTTPS from "./src/LeagueClientHTTPS";
import LeagueClientWebSocket from "./src/LeagueClientWebSocket";
import { AbstractState, ActiveState, InactiveState } from "./src/state";
import { WS_OPCODES } from "./src/data/WebSocketOpcodes";
import routes from "./src/data/routes";

import { isEqual } from "lodash";
import { MessageDTO } from "../../types/MessageDTO";

export default class Needlework {
  clientAuthentication: LeagueClientAuth | null;
  clientHTTPS: LeagueClientHTTPS | null;
  clientWebSocket: LeagueClientWebSocket | null;
  _pollInterval: any | null;
  _pollPeriod: number;
  _state: AbstractState | null;
  _updateEventCallback: Function | null;
  _cache: { lastData: any };

  constructor(pollPeriod: number) {
    this.clientAuthentication = null;
    this.clientHTTPS = null;
    this.clientWebSocket = null;
    this._pollInterval = null;
    this._pollPeriod = pollPeriod;
    this._state = null;
    this._updateEventCallback = null;
    this._cache = {
      lastData: null,
    };
  }

  changeState(state: AbstractState) {
    this._state = state;
  }

  /**
   * Poll event loop that is delegated to  `_state`. See `ActiveState` and
   * `InactiveState` for implementation.
   */
  pollingEventLoop() {
    return this._state?.pollingEventLoop();
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

  async _setupClientObject(clientObject: LeagueClientAuth) {
    const object = clientObject;
    await object.initialize();
    return object;
  }

  async _setupClientObjectWithAuthentication(clientObject: any) {
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
    const state: AbstractState = this.clientAuthentication.token
      ? new ActiveState(this)
      : new InactiveState(this);
    this.changeState(state);
    this._pollInterval = setInterval(
      this.pollingEventLoop.bind(this),
      this._pollPeriod
    );
  }

  handleWebSocketMessage(message: string) {
    const array = JSON.parse(message);

    const messageDTO: MessageDTO = {
      opcode: array[0],
      event: array[1],
      object: {
        data: array[2].data,
        eventType: array[2].eventType,
        uri: array[2].uri,
      },
    };

    switch (messageDTO.opcode) {
      case WS_OPCODES.EVENT:
        console.log(messageDTO.object.uri);
        for (const property in routes) {
          if (
            routes[property as keyof typeof routes] === messageDTO.object.uri
          ) {
            if (!isEqual(this._cache.lastData, messageDTO.object.data)) {
              this.sendEventUpdate(messageDTO);
            }
            this._cache.lastData = messageDTO.object.data;
            break;
          }
        }
        break;
      default:
        break;
    }
  }

  /**
   * Set callback for update event with League Client WebSocket.
   * @param {Function} callback
   */
  setUpdateEventCallback(callback: Function) {
    this._updateEventCallback = callback;
  }

  /**
   * Call `_updateEventCallback` function when a League Client WebSocket event occurs.
   */
  sendEventUpdate(messageDTO: MessageDTO) {
    this._updateEventCallback?.(messageDTO);
  }

  /**
   * Getter for `currentSummoner` that is delegated to `_state`. See `ActiveState`
   * and `ActiveState` for implementation.
   */
  currentSummoner() {
    return this._state?.currentSummoner();
  }

  /**
   * Getter for `wallet` that is delegated to `_state`. See `ActiveState`
   * and `ActiveState` for implementation.
   */
  wallet() {
    return this._state?.wallet();
  }

  /**
   * Getter for `playerLootMap` that is delegated to `_state`. See `ActiveState`
   * and `ActiveState` for implementation.
   */
  playerLootMap() {
    return this._state?.playerLootMap();
  }

  /**
   * Getter for `contextMenu` that is delegated to `_state`. See `ActiveState`
   * and `InactiveState` for implementation.
   */
  contextMenu(lootId: string) {
    return this._state?.contextMenu(lootId);
  }

  /**
   * Getter for `craft` that is delegated to `_state`. See `ActiveState` and
   * `InactiveState` for implementation.
   */
  craft(recipeName: string, lootId: string, repeat: number = 1) {
    return this._state?.craft(recipeName, lootId, repeat);
  }

  isClientActive() {
    return this.clientAuthentication?.isClientActive() ?? false;
  }
}
