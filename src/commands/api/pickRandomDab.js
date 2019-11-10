import * as Winston from "winston";
import "dotenv/config";
import axios from "axios";
import * as dabIncrement from "../../utils/dabIncrement";

const TENOR_KEY = process.env.TENOR_API_KEY;

const exec = async (msg) => {
  const searchTerm = "dab";
  const contentFilter = "low";
  const mediaFilter = "basic";
  const queryLimit = 1;
  const tenorRandomSearchEndpoint = `https://api.tenor.com/v1/random?key=${TENOR_KEY}&q=${searchTerm}&contentfilter=${contentFilter}&media_filter=${mediaFilter}&limit=${queryLimit}`;
  const tenorRandomSearch = await axios.get(tenorRandomSearchEndpoint);

  if (tenorRandomSearch.data.results && tenorRandomSearch.data.results.length) {
    const result = tenorRandomSearch.data.results[0];
    const dabUrl = result.media[0].gif.url;

    msg.channel.send(dabUrl);
  } else {
    Winston.error(tenorRandomSearch);
    msg.channel.send("The Tenor gif API seems to be having issues right now! Please try again later.");
  }

  dabIncrement.exec(msg.author.username.toLowerCase(), msg);
};

export { 
  exec,
};
