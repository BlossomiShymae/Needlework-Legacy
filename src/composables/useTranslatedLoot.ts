import { PlayerLoot } from "@/types/PlayerLoot";
import { ref, computed, Ref } from "vue";
import { useLootStore } from "@/stores/loot";

export default function useTranslatedLoot(loots: Ref<PlayerLoot[]>) {
  const translatedLoots: Ref<PlayerLoot[]> = ref([]);

  const keyAdapter = (key: string, value: string) => {
    const snakeCase = (string: string) => {
      return string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    };
    const lowerCase = (string: string) => {
      return string.replace(/[A-Z]/g, (letter) => `${letter.toLowerCase()}`);
    };

    let _key = `loot_${snakeCase(key)}`;
    if (key.includes("loot")) _key = `${snakeCase(key)}`;
    if (value) _key = `${_key}_${lowerCase(value)}`;

    return _key;
  };

  const store = useLootStore();
  const data = computed(() => store.lootTable as any);

  translatedLoots.value = loots.value.map((loot: any) => {
    const transLoot: any = {};
    transLoot.lootNameRaw = loot?.lootName;
    for (const property in loot) {
      transLoot[property] = loot[property];

      if (typeof loot[property] == "string") {
        const transKey = keyAdapter(property, loot[property]);

        if (Object.prototype.hasOwnProperty.call(data.value, transKey)) {
          transLoot[property] = data.value[transKey];
        }
      }
    }
    return transLoot;
  });

  return translatedLoots;
}
