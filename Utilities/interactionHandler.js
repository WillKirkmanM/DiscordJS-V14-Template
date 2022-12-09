import { REST, Routes } from "discord.js";
import chalk from "chalk";
import pkg from "glob";
const { glob } = pkg
import { promisify } from "node:util";
const proGlob = promisify(glob);

export default async function interactionHandler(client) {
  try {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/Interactions/**/*.js`);

    for (let i = 0; i < Files.length; i++) {
      client.interactionsArray = [];
      const interactionFile = await import(Files[i]);
      const interaction = interactionFile.default

      client.interactions.set(interaction.data.name, interaction);
      client.interactionsArray.push(interaction.data.toJSON());
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        process.stdout.write(`[${chalk.blue("INFO")}] - Refreshing Slash Command List!\n`);
        const guildIds = await client.guilds.cache.map((guild) => guild.id);
        const clientId = await client.user.id;
        guildIds.forEach(async (guildId) => {
          await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: client.interactionsArray,
          });
        });

        process.stdout.write(`[${chalk.blue("INFO")}] - Successfully Refreshed Slash Command List!\n`);
      } catch (err) {
        process.stdout.write(`[${chalk.red("InteractionHandler")}] - ${err}\n`);
      }
    })();
  } catch (err) {
    process.stdout.write(`[${chalk.red("InteractionHandler")}] - ${err}\n`)
  }
}
