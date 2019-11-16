import * as Winston from "winston";
import "dotenv/config";
import axios from "axios";
import * as dabIncrement from "../../utils/dabIncrement";

const GIPHY_KEY = process.env.GIPHY_API_KEY;

const exec = async (msg) => {
  const searchTerm = "dab";
  const contentFilter = "pg-13";
  const giphyRandomSearchEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_KEY}&tag=${searchTerm}&rating=${contentFilter}`;
  const giphyRandomSearch = await axios.get(giphyRandomSearchEndpoint);

  if (giphyRandomSearch.data.meta.status === 200) {
    const dabUrl = giphyRandomSearch.data.data.url;
    
    msg.channel.send(dabUrl);
  } else {
    Winston.error(giphyRandomSearch);
    msg.channel.send("The GIPHY gif API seems to be having issues right now! Please try again later.");
  }

  dabIncrement.exec(msg.author.username.toLowerCase(), msg);
};

export { 
  exec,
};
