import NeedleworkConsole from "../NeedleworkConsole";
import { AbstractState, InactiveState } from "./index";
import routes from "../data/routes";

/** Represents a state of active connection with League Client */
export class ActiveState extends AbstractState {
  constructor(api) {
    super(api);

    this._api.clientWebSocket.handleMessageEvent(
      this._api.handleWebSocketMessage.bind(this._api)
    );
  }

  /**
   * Poll event loop that checks the League Client process. If inactive, set
   * state to InactiveState.
   * @function
   */
  pollingEventLoop() {
    if (!this._api.clientAuthentication.isClientActive()) {
      NeedleworkConsole.log("Lost connection with League Client!");
      this._api.handleWebSocketMessage(
        JSON.stringify([
          8,
          "",
          {
            data: "active",
            eventType: "",
            uri: routes.CLIENT_INACTIVE,
          },
        ])
      );
      this._api.changeState(new InactiveState(this._api));
    }
  }

  /**
   * @typedef rerollPoints
   * @property {Number} currentPoints
   * @property {Number} maxRolls
   * @property {Number} numberOfRolls
   * @property {Number} pointsCostToRoll
   * @property {Number} pointsToReroll
   */

  /**
   * @typedef currentSummonerDTO
   * @property {Number} accountId
   * @property {String} displayName
   * @property {String} internalName
   * @property {Boolean} nameChangeFlag
   * @property {Number} percentCompleteForNextLevel
   * @property {String} privacy
   * @property {Number} profileIconId
   * @property {String} puuid
   * @property {rerollPoints} rerollPoints
   * @property {Number} summonerId
   * @property {Number} summonerLevel
   * @property {Boolean} unnamed
   * @property {Number} xpSinceLastLevel
   * @property {Number} xpUntilNextLevel
   */

  /**
   * Returns currentSummonerDTO promise from League Client by HTTPS.
   * @returns {Promise<currentSummonerDTO>}
   */
  get currentSummoner() {
    return this._api.clientHTTPS.fetch(routes.CURRENT_SUMMONER);
  }

  /**
   * @typedef walletDTO
   * @property {Number} ip
   * @property {Number} rp
   */

  /**
   * Returns walletDTO promise from League Client by HTTPS.
   * @returns {Promise<walletDTO>}
   */
  get wallet() {
    return this._api.clientHTTPS.fetch(routes.WALLET);
  }

  /**
   * @typedef playerLoot
   * @property {String} asset
   * @property {Number} count
   * @property {String} disenchantLootName
   * @property {Number} disenchantValue
   * @property {String} displayCategories
   * @property {Number} expiryTime
   * @property {Boolean} isNew
   * @property {Boolean} isRental
   * @property {String} itemDesc
   * @property {String} itemStatus
   * @property {String} localizedDescription
   * @property {String} localizedName
   * @property {String} localizedRecipeSubtitle
   * @property {String} localizedRecipeTitle
   * @property {String} lootId
   * @property {String} lootName
   * @property {String} parentItemStatus
   * @property {Number} parentStoreItemId
   * @property {String} rarity
   * @property {String} redeemableStatus
   * @property {String} refId
   * @property {Number} rentalGames
   * @property {Number} rentalSeconds
   * @property {String} shadowPath
   * @property {String} splashPath
   * @property {Number} storeItemId
   * @property {String} tags
   * @property {String} tilePath
   * @property {String} type
   * @property {String} upgradeEssenceName
   * @property {Number} upgradeEssenceValue
   * @property {String} upgradeLootName
   * @property {Number} value
   */

  /**
   * @typedef playerLootMapDTO
   * @property {playerLoot}
   */

  /**
   * Returns playerLootMapDTO promise from League Client by HTTPS.
   * @returns {Promise<playerLootMapDTO>}
   */
  get playerLootMap() {
    return this._api.clientHTTPS.fetch(routes.PLAYER_LOOT_MAP);
  }
}
