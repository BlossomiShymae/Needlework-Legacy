import FileService from "./FileService";
import FileDownloader from "../libs/FileDownloader";
import { ResponseType } from "axios";

export default class DynamicFileService extends FileService {
  fileDownloader: FileDownloader;
  
  constructor({ filePath, url, responseType } : {filePath: string, url: string, responseType: ResponseType}) {
    super(filePath);

    this.fileDownloader = new FileDownloader(url, responseType);
  }

  async toBuffer() {
    let buffer = super.toBufferSync();

    if (buffer == null) {
      // Download file if not found
      const response: any = await this.fileDownloader.download();
      await this.fileWriter.write(response);
      buffer = super.toBufferSync();
    }

    return buffer;
  }
}
