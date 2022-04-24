const axios = require("axios");
import { ResponseType } from "axios";
import rateLimit, { RateLimitedAxiosInstance } from "axios-rate-limit";

export default class FileDownloader {
  static hostMap = new Map();
  axios: RateLimitedAxiosInstance;
  url: string;
  responseType: ResponseType;

  constructor(url: string, responseType: ResponseType) {
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

    this.axios = FileDownloader.hostMap.get(formattedURL.hostname);
    this.url = url;
    this.responseType = responseType;
  }

  isInHostMap(url: string) {
    const _url = new URL(url);
    return FileDownloader.hostMap.get(_url.hostname);
  }

  async download<T>() {
    try {
      const response = await this.axios.get<T>(this.url, {
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
