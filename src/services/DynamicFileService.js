import FileService from "./FileService";
import FileDownloader from "../libs/FileDownloader";

export default class DynamicFileService extends FileService {
  constructor({ filePath, url, responseType }) {
    super(filePath);

    this.fileDownloader = new FileDownloader(url, responseType);
  }

  async toBuffer() {
    const buffer = super.toBuffer();

    if (buffer == null) {
      // Download file if not found
      const response = await this.fileDownloader.download();
      await this.fileWriter.write(response);
    }

    return this.fileReader.read();
  }
}