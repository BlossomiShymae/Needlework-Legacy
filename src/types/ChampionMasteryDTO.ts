export type ChampionMasteryDTO = {
  championId: number;
  championLevel: number;
  championPoints: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestsGranted: boolean;
  formattedChampionPoints: number;
  highestGrade: string;
  lastPlayTime: number;
  playerId: number;
  tokensEarned: number;
};
