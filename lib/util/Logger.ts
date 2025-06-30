import colors from "colors"
import moment from "moment"

export default class Logger {
  /**
   * log a message in green
   */
  public static send(message: string) {
    return console.log(colors.green(`[${moment(Date.now()).format("hh:mm:ss")}] ${message}`))
  }
  /**
   * log a message in yellow
   */
  public static warn(message: string) {
    return console.log(colors.yellow(`[${moment(Date.now()).format("hh:mm:ss")}] ${message}`))
  }
  /**
   * log a message in red
   */
  public static async error(error: Error | string) {
    if(typeof error === "string") {
      return console.log(colors.red(`[${moment(Date.now()).format("hh:mm:ss")}] ${error}`))
    }
    return console.log(colors.red(`[${moment(Date.now()).format("hh:mm:ss")}] ${error.stack ?? error}`))
  }
}