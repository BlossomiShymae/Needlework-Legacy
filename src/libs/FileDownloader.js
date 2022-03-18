const axios = require("axios");
import rateLimit from "axios-rate-limit";

export default class FileDownloader {
  static hostMap = new Map();

  constructor(url, responseType) {
    if (!this.isInHostMap(url)) {
      this.axios = rateLimit(axios.create(), {
        maxRequests: 5,
        perMilliseconds: 1000,
        maxRPS: 5,
      });

      const formattedURL = new URL(url);
      FileDownloader.hostMap.set(formattedURL.hostname, this.axios);
      console.log(
        `FileDownloader: Added ${formattedURL.hostname} to active host map with unique axios instance.`
      );
      console.log(`FileDownloader: Active host map:`);
      console.log(FileDownloader.hostMap.keys());
    }

    const formattedURL = new URL(url);

    this.axios = FileDownloader.hostMap.get(formattedURL.hostname, this.axios);
    this.url = url;
    this.responseType = responseType;
  }

  isInHostMap(url) {
    const _url = new URL(url);
    return FileDownloader.hostMap.get(_url.hostname);
  }

  async download() {
    try {
      const response = await this.axios.get(this.url, {
        responseType: this.responseType,
      });

      console.log(
        `FileDownloader: Downloading file by ${this.responseType} from ${this.url}`
      );

      return await response;
    } catch (error) {
      console.error(error);
    }
  }
}
