/**
 * @abstract
 * Abstract state meant for inheritance only
 */
export class AbstractState {
  constructor(api) {
    this._api = api;
  }

  /**
   * @abstract
   */
  pollingEventLoop() {}

  /**
   * @abstract
   */
  get currentSummoner() {}

  /**
   * @abstract
   */
  get wallet() {}

  /**
   * @abstract
   */
  get playerLootMap() {}
}
