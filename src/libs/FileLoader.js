import fs from "fs";
const axios = require("axios");

export default class FileLoader {
  constructor() {
    this.axios = axios.create({
      timeout: 5000,
    });
  }
  async load(endpoint, dir, path, type) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      if (!fs.existsSync(path)) {
        const response = await this.axios.get(endpoint, {
          responseType: type,
        });

        const stream = fs.createWriteStream(path);
        response.data.pipe(stream);

        const file = new Promise((resolve, reject) => {
          stream.on("finish", () => {
            resolve(fs.readFileSync(path));
          });
          stream.on("error", reject);
        });

        return await file;
      } else {
        return fs.readFileSync(path);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
