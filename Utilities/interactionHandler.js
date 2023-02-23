import { REST, Routes } from "discord.js";
import chalk from "chalk";
import pkg from "glob";
const { glob } = pkg
import { promisify } from "node:util";
const proGlob = promisify(glob);
import { pathToFileURL } from "node:url";
import { client } from "../index.js";

try {
  client.interactions.clear()
  client.subCommands.clear();

  const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/Interactions/Commands/**/*.js`);

  client.interactionsArray = [];

  for (let i = 0; i < Files.length; i++) {
    Files[i] = pathToFileURL(Files[i])

    const interactionFile = await import(Files[i]);
    const interaction = interactionFile.default

    if (interaction.subCommand) {
      client.subCommands.set(interaction.subCommand, interaction)
      continue
    }

    client.interactions.set(interaction.data.name, interaction);
    client.interactionsArray.push(interaction.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    process.stdout.write(`[${chalk.blue("INFO")}] - Refreshing Slash Command List!\n`);
    const clientId = await client.user.id;
    const guildIds = await client.guilds.cache.map((guild) => guild.id);
    guildIds.forEach(async (guildId) => {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.interactionsArray,
      });
    });
    process.stdout.write(`[${chalk.blue("INFO")}] - Successfully Refreshed Slash Command (/) List!\n`);

  } catch (err) {
    process.stdout.write(`[${chalk.red("InteractionHandler")}] - ${err}\n`);
  }
} catch (err) {
  process.stdout.write(`[${chalk.red("InteractionHandler")}] - ${err}\n`)
}
