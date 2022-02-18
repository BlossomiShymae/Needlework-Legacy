import { app } from "electron";
import path from "path";

// Snip-Snip application data folder
const appdata = app.getPath("userData");

// Data subfolder
const data = path.join(appdata, "data");
const certificate = path.join(data, "riotgames.pem");
const loottable = path.join(data, "loottable.json");

// Paths lookup table
const paths = Object.freeze({
  appdata,
  data,
  certificate,
  loottable,
});

export default paths;
