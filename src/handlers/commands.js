import * as HelpCommand from "../commands/help";

module.exports = {
  onCommand(msg, prefix) {
    const userMessageString = msg.content;
    const userMessageArray = userMessageString.toLowerCase().split(" ");
    const commandWithoutPrefix = userMessageArray[0].substr(prefix.length, userMessageArray[0].length);

    switch(commandWithoutPrefix) {
      case 'help':
        HelpCommand.exec(msg);
        break;
      case '':
        msg.channel.send("You didn't specify a command you stupid idiot!");
        break;
      default:
        msg.channel.send("That's not a valid command. Use !help to see a list of available commands.");
    }
  }
}