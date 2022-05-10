import { AxiosResponse } from 'axios';
import fs from 'fs';

export default class FileWriter {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async write(response: AxiosResponse) {
    try {
      if (!fs.existsSync(this.filePath)) {
        const stream = fs.createWriteStream(this.filePath);
        response.data.pipe(stream);

        const promise = new Promise((resolve, reject) => {
          stream.on('finish', resolve);
          stream.on('error', reject);
        });

        return await promise;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
