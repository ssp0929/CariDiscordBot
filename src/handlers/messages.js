import {
  dabMap,
  haegMap,
  postureMap,
  nutMap,
  buttMap,
} from "../utils/messageChoices";
import * as pickRandomDab from "../commands/api/pickRandomDab";
import * as haegReplace from "../commands/misc/haegReplace";

const onMessage = async (msg) => {
  const userMessageArray = msg.content.toLowerCase().split(" ");

  userMessageArray.forEach((word) => {
    if (dabMap[word]) {
      pickRandomDab.exec(msg);
    }

    if (haegMap[word]) {
      haegReplace.exec(msg);
    }
  
    if (postureMap[word]) {
      msg.react("🍆");
    }
  
    if (nutMap[word]) {
      msg.react("🌰");
    }
  
    if (buttMap[word]) {
      msg.react("🍑");
    }
  });
};

export { 
  onMessage,
};
