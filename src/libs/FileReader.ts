import fs from 'fs';

export default class FileReader {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  read() {
    return fs.readFileSync(this.filePath);
  }
}
