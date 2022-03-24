export default class NeedleworkConsole {
  static signature = "Needlework: ";
  static log(args) {
    if (args instanceof Object) {
      console.log(NeedleworkConsole.signature, args);
    } else {
      console.log(NeedleworkConsole.signature + args);
    }
  }
}
