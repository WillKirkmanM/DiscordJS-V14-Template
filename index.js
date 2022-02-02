#!/usr/bin/env node

// fs Library built into nodeJS for Command & Event Handling
const fs = require("fs");

// path Library build into NodeJS required for DotEnv 
const path = require('path')

// Requiring dotenv to Keep Token Private
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

// Importing Discord Library
const { Client, Intents, Collection } = require("discord.js");

// Setting Intents for Client (to add an Intent copy this 'Intents.FLAGS.<Intent>')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Setting a Global Collection for Commands, Aliases & Interactions
client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();

// Command Handler
fs.readdir("./commands/", async (err, files) => {
  const commandHandler = require("./handler/commandHandler");
  await commandHandler(err, files, client);
});

// Event Handler
fs.readdir("./events/", (err, files) => {
  const eventHandler = require("./handler/eventHandler");
  eventHandler(err, files, client);
});

// Logging in to the TOKEN in .env
client.login(process.env.TOKEN);
