const emojiArray = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];

const exec = (numArray) => {
  let emojiString = "";
  for (let num = 0; num < numArray.length; num++) {
    emojiString += emojiArray[parseInt(numArray[num], 10)];
  }
  return emojiString;
}

export default exec;