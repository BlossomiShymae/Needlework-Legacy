import Needlework from '../..';
import routes from '../data/routes';
import NeedleworkConsole from '../NeedleworkConsole';
import { AbstractState, ActiveState } from './index';

/** Represents a state of no connection with League Client. */
export class InactiveState extends AbstractState {
  constructor(api: Needlework) {
    super(api);

    this._api.clientWebSocket?.handleMessageEvent(
      this._api.handleWebSocketMessage.bind(this._api)
    );
  }

  /**
   * Poll event loop that checks the League Client process. If active,
   * setup web protocols before setting state to ActiveState.
   */
  pollingEventLoop() {
    NeedleworkConsole.log('Attempting to connect with League Client...');
    if (this._api.clientAuthentication?.isClientActive()) {
      /**
       * Clear poll interval before using setTimeout later in function.
       */
      this._api.clearPollInterval();

      NeedleworkConsole.log('Establishing connection with League Client...');
      const _data = this._api.clientAuthentication.getAuthForWindows();
      this._api.clientAuthentication.setAuthentication(_data);

      /**
       * Synchronously wait for 15 seconds to avoid fatal CONNECTION_REFUSED
       * before reinitializing client web protocols.
       * Re-establish polling event loop.
       *
       * @todo Find a better way to handle fatal error.
       */
      const reinitForClient = () => {
        this._api.clientHTTPS?.reinit();
        this._api.clientWebSocket?.reinit();

        this._api.handleWebSocketMessage(
          JSON.stringify([
            8,
            '',
            {
              data: 'inactive',
              eventType: '',
              uri: routes.CLIENT_ACTIVE,
            },
          ])
        );
        this._api.changeState(new ActiveState(this._api));
        this._api.setPollInterval();
      };
      setTimeout(reinitForClient, 15000);
    }
  }

  /**
   * Returns null type since League Client process is dead.
   */
  currentSummoner() {
    return null;
  }

  /**
   * Returns null type since League Client process is dead.
   */
  wallet() {
    return null;
  }

  /**
   * Returns null type since League Client process is dead.
   */
  playerLootMap() {
    return null;
  }

  /**
   * Returns null type since League Client process is dead.
   */
  contextMenu(lootId: string) {
    return null;
  }

  /**
   * Returns null type since League Client process is dead.
   */
  craft(recipeName: string, lootId: string, repeat: number) {
    return null;
  }
}
