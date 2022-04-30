import NeedleworkConsole from "../NeedleworkConsole";
import { AbstractState, InactiveState } from "./index";
import routes from "../data/routes";
import Needlework from "../..";
import { CurrentSummonerDTO } from "@/types/CurrentSummonerDTO";
import { WalletDTO } from "@/types/WalletDTO";
import { PlayerLootMap } from "@/types/PlayerLootMap";
import { ContextMenu } from "@/types/ContextMenu";
import { CraftResponse } from "@/types/CraftResponse";
import { HTTPMethods } from "@/enums/httpMethods";

/** Represents a state of active connection with League Client */
export class ActiveState extends AbstractState {
  constructor(api: Needlework) {
    super(api);

    this._api.clientWebSocket?.handleMessageEvent(
      this._api.handleWebSocketMessage.bind(this._api)
    );
  }

  /**
   * Poll event loop that checks the League Client process. If inactive, set
   * state to InactiveState.
   */
  pollingEventLoop() {
    if (!this._api.clientAuthentication?.isClientActive()) {
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
   * Returns CurrentSummonerDTO promise from League Client by HTTPS.
   */
  currentSummoner(): undefined | Promise<CurrentSummonerDTO> {
    return this._api.clientHTTPS?.fetch(
      routes.CURRENT_SUMMONER,
      HTTPMethods.GET
    );
  }

  /**
   * Returns WalletDTO promise from League Client by HTTPS.
   */
  wallet(): undefined | Promise<WalletDTO> {
    return this._api.clientHTTPS?.fetch(routes.WALLET, HTTPMethods.GET);
  }

  /**
   * Returns PlayerLootMapDTO promise from League Client by HTTPS.
   */
  playerLootMap(): undefined | Promise<PlayerLootMap> {
    return this._api.clientHTTPS?.fetch(
      routes.PLAYER_LOOT_MAP,
      HTTPMethods.GET
    );
  }

  /**
   * Returns ContextMenu[] promise from League Client by HTTPS.
   */
  contextMenu(lootId: string): undefined | Promise<ContextMenu[]> {
    return this._api.clientHTTPS?.fetch(
      `${routes.CONTEXT_MENU_PREPEND}${lootId}${routes.CONTEXT_MENU_APPEND}`,
      HTTPMethods.GET
    );
  }

  /**
   * Returns CraftResponse promise from League Client by HTTPS.
   */
  craft(
    recipeName: string,
    lootId: string,
    repeat: number
  ): undefined | Promise<CraftResponse> {
    return this._api.clientHTTPS?.fetch(
      `${routes.CRAFT_PREPEND}${recipeName}${
        routes.CRAFT_APPEND
      }?repeat=${repeat.toString(10)}`,
      HTTPMethods.POST,
      [lootId]
    );
  }
}
