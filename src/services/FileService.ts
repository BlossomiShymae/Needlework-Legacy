import FileReader from '../libs/FileReader';
import FileWriter from '../libs/FileWriter';
import paths from '../static/paths';
import fs from 'fs';

export default class FileService {
  filePath: string;
  fileReader: FileReader;
  fileWriter: FileWriter;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.fileReader = new FileReader(filePath);
    this.fileWriter = new FileWriter(filePath);

    this.initialize();
  }

  initialize() {
    try {
      if (!fs.existsSync(paths.data)) {
        fs.mkdirSync(paths.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  exists() {
    return fs.existsSync(this.filePath);
  }

  toBufferSync() {
    try {
      if (!this.exists()) {
        return null;
      }

      // Read file buffer
      return this.fileReader.read();
    } catch (error) {
      console.error(error);
    }
  }
}
