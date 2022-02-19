import { app } from "electron";
import path from "path";

// Snip-Snip application data folder
const appdata = app.getPath("userData");

// Data subfolder
const data = path.join(appdata, "data");
const certificate = path.join(data, "riotgames.pem");
const lootTranslation = path.join(data, "loot_translation.json");

// Paths lookup table
const paths = Object.freeze({
  appdata,
  data,
  certificate,
  lootTranslation,
});

export default paths;
