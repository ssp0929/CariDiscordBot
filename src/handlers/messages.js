import * as Randomizer from "../utils/randomizer";

module.exports = {
  onMessage(msg) {
    const userMessageString = msg.content;
    const userMessageArray = userMessageString.toLowerCase().split(" ");

    if (userMessageArray.includes("ping")) {
      msg.reply("Pong!");
    }

    if (userMessageArray.includes("dab")) {
      const dabOptions = [
        "src/assets/img/highSpeedDab.gif", 
        "src/assets/img/dabPanda.png", 
        "src/assets/img/dabSquid.png", 
        "src/assets/img/dabSquidAnimated.gif"
      ];
      const dabOptionsLength = dabOptions.length;
      let dabIndex = Randomizer.generate(dabOptionsLength);
      // console.log("Dab chosen", dabOptions[dabIndex]);
      msg.channel.send({
        files: [{
          attachment: dabOptions[dabIndex]
        }]
      })
    }
  }
}