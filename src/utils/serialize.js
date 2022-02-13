export default class Serialize {
  static prepareForIPC(data) {
    return JSON.parse(JSON.stringify(data));
  }
}
