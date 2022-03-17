import fs from "fs";

export default class FileReader {
  constructor(filePath) {
    this.filePath = filePath;
  }

  read() {
    return fs.readFileSync(this.filePath);
  }
}
