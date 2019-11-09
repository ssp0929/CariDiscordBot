# CariDiscordBot

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5132e6c174904671858f6f622c2c9f48)](https://app.codacy.com/app/ssp0929/CariDiscordBot?utm_source=github.com&utm_medium=referral&utm_content=ssp0929/CariDiscordBot&utm_campaign=Badge_Grade_Dashboard)

## Development
Due to the nature of how Discord 'apps' work, we cannot spin up multiple instances of the same bot application mapping to bot users in Discord. As a workaround, you can create your own personal Discord 'app' [here](https://discordapp.com/developers/applications) and invite them to the channel to test your development work.

You will also need to create an .env file in the root level to pass the necessary TOKENS to get it to work. This file is .gitignored to prevent public keys/tokens/secrets from being visible in version control.

The structure of the .env file in its current state:
```javascript
// .env
TOKEN=YOUR_BOT_TOKEN_HERE // STRING
MONGO_USER=YOUR_DB_USERNAME_HERE // STRING
MONGO_PASS=YOUR_DB_PASSWORD_HERE // STRING
```

## NPM scripts

This allows you to run a babel-node compiled instance of the bot given you have the correct credentials in the .env file.
```shell
npm run start
```

This allows you to run a NODEMON babel-node compiled instance of the bot given you have the correct credentials in the .env file. (hot-reload)
```shell
npm run dev
```

This is a good schema/connection test for Mongo. Will soon be deprecated.
```shell
npm run testSchema
```

## Application Flow
I'm sure this will change heavily as development occurs, but basically we follow the pattern of event listeners on messages (or commands designated by a specified prefix) flowing into a general handler that will decide whether or not to invoke the command or message handlers from the /handlers folder depending on the message context and those specific handlers will import and execute specific command modules in the /commands folder.

/handlers houses second level handlers that are invoked as needed from the initial message parsing done in server.js

/commands houses modularized commands that are imported as needed by our handlers. More than likely we can roll these commands into an overarching class.

/utils has general mix-in functions that may be imported in several places across the application. It also stores constants / arrays that are used across the application as well. More than likely we can roll those into MongoDB so we can implement more dynamic behavior (additions/removals) from trusted users.

/models houses the initial MongoDB connection that is executed on startup. The bot will wait until the connection is established before fully initialized and accepting further commands / messages. This location also houses our general MongoDB schema for the 'users' collection.

/assets houses non-code assets (images / videos / etc) that are used throughout the application. Was considering S3, but opted not to due to generally poor network performance of the bot and it costs money as small an amount as that may be for an application like this that won't be hitting S3 that much.

/classes houses ES6 classes. WIP, nothing in the application in its current state is utilizing class-based OOP yet.

## Application specific configurations

.babelrc - Application specific babel crosspile packages. Need this for running babel-node and making sure code is crosspiled to support ES6 features without using Node's --experimental flag and renaming everything into .mjs files.

.eslintrc - Application specific eslint configurations. You may want to install the eslint extension on your IDE for quality of life when developing and dealing with linting errors.

package.json - General npm configurations and npm scripts.

package-log.json - Generated npm lockfile, allows for dependency version locking for direct dependecies as well as downstream dependencies of those direct dependencies.

.env - As explained prior, specific environment variables needed for the bot that we need but don't want checked into version control and visible publicly. Dotenv npm module handles loading in these variables in server.js and models/mongo/db.js on application start.
