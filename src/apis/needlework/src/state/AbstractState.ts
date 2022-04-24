import Needlework from "../..";

/**
 * @abstract
 * Abstract state meant for inheritance only
 */
export abstract class AbstractState {
  _api: Needlework;

  constructor(api: Needlework) {
    this._api = api;
  }

  abstract pollingEventLoop(): void;

  abstract currentSummoner(): any;
  abstract wallet(): any;
  abstract playerLootMap(): any;
}
