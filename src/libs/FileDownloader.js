const axios = require("axios");

export default class FileDownloader {
  constructor(url, responseType) {
    this.axios = axios.create({
      timeout: 5000,
    });
    this.url = url;
    this.responseType = responseType;
  }

  async download() {
    try {
      const response = await this.axios.get(this.url, {
        responseType: this.responseType,
      });

      return await response;
    } catch (error) {
      console.error(error);
    }
  }
}
