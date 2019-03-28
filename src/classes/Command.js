/** 
 * Represents a command
*/
class Command {
  /**
   * @param {Client} client The client used in the command 
   * @param {String} commandType The command's configuration
   * @param {Object} commandArguments The command's arguments
  */
  constructor(client, commandType, commandArguments) {
    this.client = client;
    this.commandType = commandType;
    this.commandArguments = commandArguments;
  }

  ping() {
    let contextString = this.commandArguments.msg.context;
    let compactedString = contextString.split(" ").join("");
    if (compactedString.includes("ping")) {
      msg.reply("Pong!");
    }
  }
}

module.exports = Command;