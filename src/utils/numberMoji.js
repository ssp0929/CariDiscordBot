const emojiArray = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];

module.exports = {
  exec(numArray) {
    let emojiString = "";
    for (const num of numArray) {
      emojiString += emojiArray[parseInt(numArray[num], 10)];
    }
    return emojiString;
  },
};
