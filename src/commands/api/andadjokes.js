import * as Winston from "winston";
import axios from "axios";

const exec = async (msg) => {
  const dadJokeEndpoint = "https://icanhazdadjoke.com/";
  const dadJoke = await axios.get(dadJokeEndpoint, {
    headers: { Accept: "application/json" },
  });

  if (dadJoke.data && dadJoke.data.status === 200) {
    const result = dadJoke.data.joke;
    Winston.log("info", `Random gif chosen ${result}`);
    msg.channel.send(`\`\`\`${result}\`\`\``);
  } else {
    Winston.log("error", "Dad jokes endpoint returned with a non-200 status.");
    msg.channel.send("Dad joke API is having issues!");
  }
};

export { 
  exec,
};
