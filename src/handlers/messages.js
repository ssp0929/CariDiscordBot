/* eslint-disable no-restricted-syntax */
import * as Winston from "winston";
import "dotenv/config";
import axios from "axios";
import { 
  pingArray, 
  dabArray, 
  hateArray, 
  haegArray,
  postureArray,
} from "../utils/messageChoices";
import * as dabIncrement from "../utils/dabIncrement";

const TENOR_KEY = process.env.TENOR_API_KEY;

const pickRandomDab = async (msg) => {
  const searchTerm = "dab";
  const contentFilter = "low";
  const mediaFilter = "basic";
  const queryLimit = 1;
  const tenorRandomSearchEndpoint = `https://api.tenor.com/v1/random?key=${TENOR_KEY}&q=${searchTerm}&contentfilter=${contentFilter}&media_filter=${mediaFilter}&limit=${queryLimit}`;
  const tenorRandomSearch = await axios.get(tenorRandomSearchEndpoint);

  if (tenorRandomSearch.data.results && tenorRandomSearch.data.results.length) {
    const result = tenorRandomSearch.data.results[0];
    const dabUrl = result.media[0].gif.url;

    Winston.log("info", `Dab chosen ${dabUrl}`);
    msg.channel.send(dabUrl);
  } else {
    Winston.log("error", tenorRandomSearch);
    msg.channel.send("The Tenor gif API seems to be having issues right now! Please try again later.");
  }

  dabIncrement.exec(msg.author.username.toLowerCase(), msg);
};

const haegReplace = (userMessageStringPreserveCase) => {
  const preserveCaseArray = userMessageStringPreserveCase.split(" ");
  const reconstructedMessageArray = [];
  for (const word of preserveCaseArray) {
    if (haegArray.includes(word.toLowerCase())) {
      reconstructedMessageArray.push("HAEG");
    } else {
      reconstructedMessageArray.push(word);
    }
  }

  return reconstructedMessageArray.join(" ");
};

const onMessage = async (msg) => {
  const userMessageString = msg.content.toLowerCase();
  const userMessageStringPreserveCase = msg.content;
  const userMessageArray = userMessageString.split(" ");

  if (userMessageArray.some(word => pingArray.includes(word))) {
    msg.reply("Pong!");
  }

  if (userMessageArray.some(word => dabArray.includes(word))) {
    pickRandomDab(msg);
  }

  if (userMessageArray.some(word => hateArray.includes(word))) {
    msg.channel.send("https://streamable.com/lhanx");
  }

  if (userMessageArray.some(word => haegArray.includes(word))) {
    msg.reply(`I think you meant to say '${haegReplace(userMessageStringPreserveCase)}'`);
  }

  if (userMessageArray.some(word => postureArray.includes(word))) {
    msg.react("🍆");
  }
};

export default onMessage;
