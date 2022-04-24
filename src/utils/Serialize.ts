export default class Serialize {
  static prepareForIPC(data: any) {
    return JSON.parse(JSON.stringify(data));
  }
}
