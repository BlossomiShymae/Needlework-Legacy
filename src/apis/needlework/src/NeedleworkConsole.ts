export default class NeedleworkConsole {
  static signature = "Needlework: ";
  static log(args: any) {
    if (args instanceof Object) {
      console.log(NeedleworkConsole.signature, args);
    } else {
      console.log(NeedleworkConsole.signature + args);
    }
  }
}
