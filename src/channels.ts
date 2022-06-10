/**
 * An enum used for `ipcRenderer.send`.
 * ```
 * window.ipcRenderer.send(SChannel.example, data: any);
 * ```
 */
export enum SChannel {
  empty = '',
}

/**
 * An enum used for asynchronous `ipcRenderer.invoke`.
 * ```
 * await window.ipcRenderer.invoke(IChannel.wallet);
 * ```
 */
export enum IChannel {
  currentSummoner = 'current-summoner',
  wallet = 'wallet',
  championMasteries = 'champion-masteries',
  ownedChampionsMinimal = 'owned-champions-minimal',
  champion = 'champion',
  playerLootMap = 'playerLootMap',
  contextMenu = 'context-menu',
  craft = 'craft',
  profileIcon = 'dd-profile-icon',
  lootTranslation = 'cd-loot-translation',
  tileIcon = 'cd-tile-icon',
  minimizeWindow = 'app-minimize-window',
  exitApplication = 'app-exit-application',
  getStore = 'app-get-store',
  setStore = 'app-set-store',
  clearImageCache = 'app-clear-image-cache',
  getImageCacheSize = 'app-get-image-cache-size',
  getVersionNumber = 'app-get-version-number',
  isClientActive = 'is-client-active',
  hideWindow = 'app-hide-window',
  checkForUpdates = 'app-check-for-updates',
  updateToLatest = 'app-update-to-latest',
}

/**
 * An enum used for `ipcRenderer.receive`.
 * ```
 * window.ipcRenderer.receive(RChannel.needleworkUpdate, (): any => void);
 * ```
 */
export enum RChannel {
  needleworkUpdate = 'needlework-update',
}

/**
 * An enum used for `ipcRenderer.once`.
 * ```
 * window.ipcRenderer.once(RChannel.example, (): any => void);
 * ```
 */
export enum OChannel {
  empty = '',
}
