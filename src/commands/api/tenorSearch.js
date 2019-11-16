import * as Winston from "winston";
import "dotenv/config";
import axios from "axios";

const TENOR_KEY = process.env.TENOR_API_KEY;

const exec = async (msg, searchTerm) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const contentFilter = "low";
  const mediaFilter = "basic";
  const queryLimit = 1;
  const tenorRandomSearchEndpoint = `https://api.tenor.com/v1/random?key=${TENOR_KEY}&q=${encodedSearchTerm}&contentfilter=${contentFilter}&media_filter=${mediaFilter}&limit=${queryLimit}`;
  const tenorRandomSearch = await axios.get(tenorRandomSearchEndpoint);

  if (tenorRandomSearch.data) {
    const result = tenorRandomSearch.data.results[0];

    if (result) {
      const gifUrl = result.media[0].gif.url;
      msg.channel.send(gifUrl);
    } else {
      msg.channel.send(`No results found for search term: ${searchTerm}`);
    }
  } else {
    Winston.error(tenorRandomSearch);
    msg.channel.send("The Tenor gif API seems to be having issues right now! Please try again later.");
  }
};

export { 
  exec,
};
