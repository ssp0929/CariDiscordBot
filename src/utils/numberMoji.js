const emojiArray = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];

const exec = (numArray) => {
  let emojiString = "";
  const numArrayLength = numArray.length;
  for (let num = 0; num < numArrayLength; num++) {
    emojiString += emojiArray[parseInt(numArray[num], 10)];
  }
  return emojiString;
};

export { 
  exec,
};
