const emojiArray = [':zero:',':one:',':two:',':three:',':four:',':five:',':six:',':seven:',':eight:',':nine:'];

module.exports = {
    exec(numArray) {
        let emojiString = '';
        for (var num in numArray) {
            emojiString = emojiString + emojiArray[ parseInt(numArray[num], 10) ];
        }
        return emojiString;
    }
}