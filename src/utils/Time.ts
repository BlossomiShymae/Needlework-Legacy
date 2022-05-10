/**
 * An abstract time class containing time related methods.
 */
export default class Time {
  /**
   * Return a timestamp string.
   * @static
   * @returns {string} A timestamp string
   *
   * @example
   *
   * console.log(Time.toString());
   * // Contains: '12:00 AM'
   */
  static toString() {
    return new Date(Date.now()).toLocaleTimeString('en-US');
  }
}
