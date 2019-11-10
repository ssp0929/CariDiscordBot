import * as Winston from "winston";
import "dotenv/config";
import axios from "axios";

const exec = async (msg, searchTerm) => {
  const omdbEndpoint = "http://www.omdbapi.com/";
  const omdb = await axios.get(omdbEndpoint, {
    params: {
      apikey: process.env.OMDB_API_KEY,
      t: searchTerm,
    },
  });

  if (omdb.data && omdb.status === 200) {
    const { data } = omdb;
    if (data.Error) {
      msg.channel.send(`Error: ${data.Error}`);
    }

    if (data.Poster) {
      msg.channel.send(data.Poster);
    }

    const message = `\`\`\`
Title: ${data.Title}\n
Year: ${data.Year}\n
Runtime: ${data.Runtime}\n
Genre: ${data.Genre}\n
Director: ${data.Director}\n
Writers: ${data.Writer}\n
Actors: ${data.Actors}\n\n
Plot: ${data.Plot}\n\n
Metascore: ${data.Metascore}\n
Website: ${data.Website}
    \`\`\``;
    return msg.channel.send(message);
  }
  Winston.error("OMDB endpoint returned with a non-200 status.");
  return msg.channel.send("OMDB API is having issues!");
};

export { 
  exec,
};
