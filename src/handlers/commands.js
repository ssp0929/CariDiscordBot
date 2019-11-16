import * as Winston from "winston";
import * as DabTrackerCommand from "../commands/misc/dabtracker";
import * as DabRankingsCommand from "../commands/misc/dabrankings";
import * as SyncCommand from "../commands/admin/sync";
import * as ReportCommand from "../commands/misc/report";
import * as ReportsCommand from "../commands/misc/reports";
import * as TenorSearchCommand from "../commands/api/tenorSearch";
import * as GiphySearchCommand from "../commands/api/giphySearch";
import * as AndadJokeCommand from "../commands/api/andadjokes";
import * as MovieSearchCommand from "../commands/api/omdb";

const generalCommands = (msg, command, userMessageArray) => {
  const commands = {
    movie: "!movie {movieTitle} - Responds with general information from movie API about the given title.",
    dabtracker: "!dabtracker - Responds with your personal tracked dabcount.",
    dabrankings: "!dabrankings - Responds with the top 10 dabber by dabcount.",
    report: "!report {user} - Allows you to report another user for being a bad birl.",
    reports: "!reports - Responds with all reports against you.",
    tenor: "!tenor {searchTerm} - Responds with a GIF grabbed from the tenor API matching your search term.",
    giphy: "!giphy {searchTerm} - Responds with a GIF grabbed from the tenor API matching your search term.",
    joke: "!joke - Responds with a funny joke from a dad joke API.",
    help: "!help - Responds with all the commands that are available.",
  };

  const commandsEntries = Object.entries(commands);

  Winston.info(`msg: ${msg} | command: ${command}`);

  let message = "";
  switch (command) {
    case "sync":
      if (msg.author.username === "iFrost") {
        SyncCommand.exec(msg);
      } else {
        Winston.info(`${msg.author.username} attempted to run the sync command!`);
        msg.channel.send("You are not allowed to run that command!");
      }
      break;
    case "movie":
      MovieSearchCommand.exec(msg, userMessageArray.slice(1).join(" "));
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
    case "tenor":
      TenorSearchCommand.exec(msg, userMessageArray.slice(1).join(" "));
      break;
    case "giphy":
      GiphySearchCommand.exec(msg, userMessageArray.slice(1).join(" "));
      break;
    case "joke":
      AndadJokeCommand.exec(msg);
      break;
    case "help":
      for (const [name, description] of commandsEntries) {
        message += `\n${name}\n\t${description}\n`;
      }
      msg.channel.send(`\`\`\`${message}\`\`\``);
      break;
    case "":
      msg.channel.send("You didn't specify a command you stupid idiot!");
      break;
    default:
      msg.channel.send("That's not a valid command. Use !help to see a list of available commands.");
  }
};

const dynamicPrefixHandler = (msg, prefix, command, userMessageArray) => {
  if (prefix === "!") {
    generalCommands(msg, command, userMessageArray);
  }
};

const onCommand = (msg, prefix) => {
  const userMessageString = msg.content;
  const userMessageArray = userMessageString.toLowerCase().split(" ");
  const command = userMessageArray[0].substring(prefix.length);
  
  dynamicPrefixHandler(msg, prefix, command, userMessageArray);
};

export {
  onCommand,
};
