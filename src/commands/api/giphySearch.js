import * as Winston from "winston";
import "dotenv/config";
import axios from "axios";

const GIPHY_KEY = process.env.GIPHY_API_KEY;

const exec = async (msg, searchTerm) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const contentFilter = "pg-13";
  const giphyRandomSearchEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_KEY}&tag=${encodedSearchTerm}&rating=${contentFilter}`;
  const giphyRandomSearch = await axios.get(giphyRandomSearchEndpoint);

  if (giphyRandomSearch.data.meta.status === 200) {
    const dabUrl = giphyRandomSearch.data.data.url;

    if (dabUrl) {
      msg.channel.send(dabUrl);
    } else {
      msg.channel.send(`No results found for search term: ${searchTerm}`);
    }
  } else {
    Winston.error(giphyRandomSearch);
    msg.channel.send("The GIPHY gif API seems to be having issues right now! Please try again later.");
  }
};

export { 
  exec,
};
