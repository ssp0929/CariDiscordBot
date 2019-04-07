/* eslint-disable no-restricted-syntax */
import * as Randomizer from "../utils/randomizer";
import { dabChoices } from "../utils/dabChoices";
import { 
  pingArray, 
  dabArray, 
  hateArray, 
  haegArray,
  postureArray,
} from "../utils/messageChoices";

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

module.exports = {
  onMessage(msg) {
    const userMessageString = msg.content.toLowerCase();
    const userMessageStringPreserveCase = msg.content;
    const userMessageArray = userMessageString.split(" ");

    if (userMessageArray.some(word => pingArray.includes(word))) {
      msg.reply("Pong!");
    }

    if (userMessageArray.some(word => dabArray.includes(word))) {
      const options = dabChoices;
      const optionsLength = options.length;
      const index = Randomizer.generate(optionsLength);
      // console.log("Dab chosen", options[index]);
      msg.channel.send({
        files: [{
          attachment: options[index],
        }],
      });
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
  },
};
