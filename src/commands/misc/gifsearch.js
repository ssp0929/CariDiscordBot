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

  if (tenorRandomSearch.data.results && tenorRandomSearch.data.results.length) {
    const result = tenorRandomSearch.data.results[0];
    const gifUrl = result.media[0].gif.url;

    if (gifUrl) {
      Winston.log("info", `Random gif chosen ${gifUrl}`);
      msg.channel.send(gifUrl);
    } else {
      Winston.log("info", `No gif results found for ${searchTerm}`);
      msg.channel.send(`No results found for ${searchTerm}`);
    }
  } else {
    Winston.log("error", tenorRandomSearch);
    msg.channel.send("The Tenor gif API seems to be having issues right now! Please try again later.");
  }
};

export { 
  exec,
};
