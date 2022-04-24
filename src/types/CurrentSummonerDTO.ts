type rerollPoints = {
  currentPoints: number,
  maxRolls: number,
  numberOfRolls: number,
  pointsCostToRoll: number,
  pointsToReroll: number,
}

export type CurrentSummonerDTO = {
  acountId: number,
  displayName: string,
  internalName: string,
  nameChangeFlag: boolean,
  percentCompleteForNextLevel: number,
  privacy: string,
  profileIconId: number,
  puuid: string,
  rerollPoints: rerollPoints,
  summonerId: number,
  summonerLevel: number,
  unnamed: boolean,
  xpSinceLastLevel: number,
  xpUntilNextLevel: number,
}