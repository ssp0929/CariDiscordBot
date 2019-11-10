import {
  haegArray,
} from "../../utils/messageChoices";

const exec = (msg) => {
  const userMessageStringPreserveCase = msg.content;
  const preserveCaseArray = userMessageStringPreserveCase.split(" ");
  const reconstructedMessageArray = [];
  for (const word of preserveCaseArray) {
    if (haegArray.includes(word.toLowerCase())) {
      reconstructedMessageArray.push("HAEG");
    } else {
      reconstructedMessageArray.push(word);
    }
  }

  return msg.reply(`I think you meant to say '${reconstructedMessageArray.join(" ")}'`);
};

export { 
  exec,
};
