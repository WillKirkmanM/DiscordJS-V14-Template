#!/usr/bin/env node
import "dotenv/config";
import { DebugLogger } from "@willkm/dl";

export const debug = new DebugLogger({
  enabled: true,
  logLevel: 1,
  prefixMessage: '[DebugLogger] - '
})

import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";

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
client.subCommands = new Collection();
client.buttons = new Collection();

// Command Handler
import commandHandler from "./Utilities/commandHandler.js"
commandHandler(client);

// Event Handler
import eventHandler from "./Utilities/eventHandler.js";
eventHandler(client);


// Button Handler
import buttonHandler from "./Utilities/buttonHandler.js";
buttonHandler(client);

// Logging in to the TOKEN in .env
client.login(process.env.TOKEN);
