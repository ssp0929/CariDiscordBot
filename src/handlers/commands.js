/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as Winston from "winston";
import * as HelpCommand from "../commands/misc/help";
import * as DabTrackerCommand from "../commands/misc/dabtracker";
import * as DabRankingsCommand from "../commands/misc/dabrankings";
import * as SyncCommand from "../commands/admin/sync";
import * as AttackCommand from "../commands/rpg/attack";
import * as ProfileCommand from "../commands/rpg/profile";
import * as ReportCommand from "../commands/misc/report";
import * as ReportsCommand from "../commands/misc/reports";
import * as GifSearchCommand from "../commands/misc/gifsearch";

// TODO: Restructure commands for dynamic command handling rather than manually adding to this command handler
const generalCommands = (msg, command, userMessageArray) => {
  switch (command) {
    case "sync":
      if (msg.author.username === "iFrost") {
        SyncCommand.exec(msg);
      } else {
        Winston.log("info", `${msg.author.username} attempted to run the sync command!`);
        msg.channel.send("You are not allowed to run that command!");
      }
      break;
    case "help":
      HelpCommand.exec(msg);
      break;
    case "dabtracker":
      DabTrackerCommand.exec(msg);
      break;
    case "dabrankings":
      DabRankingsCommand.exec(msg);
      break;
    case "report":
      ReportCommand.exec(msg, userMessageArray.slice(1).join(" "));
      break;
    case "reports":
      ReportsCommand.exec(msg);
      break;
    case "gif":
      GifSearchCommand.exec(msg, userMessageArray.slice(1).join(" "));
      break;
    case "":
      msg.channel.send("You didn't specify a command you stupid idiot!");
      break;
    default:
      msg.channel.send("That's not a valid command. Use !help to see a list of available commands.");
  }
};

const rpgCommands = (msg, command, userMessageArray) => {
  switch (command) {
    case "attack":
      AttackCommand.exec(msg, userMessageArray.slice(1).join(" "));
      break;
    case "profile":
      ProfileCommand.exec(msg);
      break;
    case "":
      msg.channel.send("You didn't specify a command you dumb idiot!");
      break;
    default:
      msg.channel.send("That's not a valid command. Use !help to see a list of available commands.");
  }
};

const dynamicPrefixHandler = (msg, prefix, command, userMessageArray) => {
  if (prefix === "!") {
    generalCommands(msg, command, userMessageArray);
  } else if (prefix === "?") {
    rpgCommands(msg, command, userMessageArray);
  }
};

const onCommand = (msg, prefix) => {
  const userMessageString = msg.content;
  const userMessageArray = userMessageString.toLowerCase().split(" ");
  const command = userMessageArray[0].substring(prefix.length);
  
  dynamicPrefixHandler(msg, prefix, command, userMessageArray);
}

export default onCommand;
