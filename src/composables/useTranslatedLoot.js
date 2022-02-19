import { ref, computed } from "vue";

export default function useTranslatedLoot(store, loots) {
  let translatedLoots = ref([]);

  const keyAdapter = (key, value) => {
    const snakeCase = (string) => {
      return string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    };
    const lowerCase = (string) => {
      return string.replace(/[A-Z]/g, (letter) => `${letter.toLowerCase()}`);
    };

    let _key = `loot_${snakeCase(key)}`;
    if (key.includes("loot")) _key = `${snakeCase(key)}`;
    if (value) _key = `${_key}_${lowerCase(value)}`;

    return _key;
  };

  const data = computed(() => store.getters.lootTable);

  translatedLoots.value = loots.value.map((loot) => {
    const transLoot = {};
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
