import { IChannel } from '@/channels';
import { ChampionJSON } from '../types/ChampionJSON';
import _ from 'lodash';

export default async function useChampionJSON() {
  const championJSON = (await window.ipcRenderer.invoke(
    IChannel.champion
  )) as ChampionJSON;

  const getChampion = (name: string) => {
    // Champion names do not have spaces.
    let key = name.replaceAll(' ', '');
    key = key.replace('.', '');
    // Void champion names go from "Kai'Sa" to "Kaisa".
    if (key.includes("'")) {
      key = key.replace("'", '');
      // Exception case
      if (key.includes('KogMaw') || key.includes('RekSai')) {
        key;
      } else {
        key = _.capitalize(key);
      }
    }
    // Champion name exceptions
    if (key.includes('Nunu&Willump')) {
      key = 'Nunu';
    }
    if (key.includes('Wukong')) {
      key = 'MonkeyKing';
    }
    if (key.includes('LeBlanc')) {
      key = 'Leblanc';
    }

    return championJSON.data[key];
  };

  return {
    getChampion,
  };
}
