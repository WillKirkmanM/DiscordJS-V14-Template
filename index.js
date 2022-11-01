#!/usr/bin/env node

require("dotenv").config();
const { env } = require("node:process");

const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");

// Setting Intents for Client to add an Intent copy this 'GatewayIntentBits.<Intent> (Your IDE Should auto-complete the intents.)'
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel
  ]
});

// Setting a Global Collection for Commands, Aliases & Interactions
client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();

// Command Handler
const commandHandler = require("./Utilities/commandHandler.js");
commandHandler(client);

// Event Handler
const eventHandler = require("./Utilities/eventHandler.js");
eventHandler(client);


// Logging in to the TOKEN in .env
client.login(env.TOKEN);
