export type ChampionDTO = {
  active: boolean;
  alias: string;
  banVoPath: string;
  baseLoadScreenPath: string;
  botEnabled: boolean;
  chooseVoPath: string;
  disabledQueries: string[];
  freeToPlay: boolean;
  id: number;
  name: string;
  ownership: {
    freeToPlayReward: boolean;
    owned: boolean;
    rental: {
      endDate: number;
      purchaseDate: number;
      rented: boolean;
      winCountRemaining: number;
    };
  };
  purchased: number;
  rankedPlayEnabled: boolean;
  roles: string[];
  squarePortraitPath: string;
  stingerSfxPath: string;
  title: string;
};
