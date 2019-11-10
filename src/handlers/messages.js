import {
  dabArray,
  haegArray,
  postureArray,
  nutArray,
  buttArray,
} from "../utils/messageChoices";
import * as pickRandomDab from "../commands/api/pickRandomDab";
import * as haegReplace from "../commands/misc/haegReplace";

const onMessage = async (msg) => {
  const userMessageArray = msg.content.toLowerCase().split(" ");

  if (userMessageArray.some((word) => dabArray.includes(word))) {
    pickRandomDab.exec(msg);
  }

  if (userMessageArray.some((word) => haegArray.includes(word))) {
    haegReplace.exec(msg);
  }

  if (userMessageArray.some((word) => postureArray.includes(word))) {
    msg.react("🍆");
  }

  if (userMessageArray.some((word) => nutArray.includes(word))) {
    msg.react("🌰");
  }

  if (userMessageArray.some((word) => buttArray.includes(word))) {
    msg.react("🍑");
  }
};

export { 
  onMessage,
};
