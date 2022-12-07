const { REST, Routes } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("node:util");
const proGlob = promisify(glob);

module.exports = async (client) => {
  try {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/Interactions/**/*.js`);

    for (let i = 0; i < Files.length; i++) {
      delete require.cache[require.resolve(Files[i])];

      client.interactionsArray = [];
      const interaction = require(Files[i]);
      client.interactions.set(interaction.data.name, interaction);
      client.interactionsArray.push(interaction.data.toJSON());
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        process.stdout.write("Refreshing Slash Command List!\n");
        const guildIds = await client.guilds.cache.map((guild) => guild.id);
        const clientId = await client.user.id;
        guildIds.forEach(async (guildId) => {
          await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: client.interactionsArray,
          });
        });

        process.stdout.write("Successfully Refreshed Slash Command List!\n");
      } catch (error) {
        process.stdout.write(`${error}\n`);
      }
    })();
  } catch (err) {
    stdout.write(`${err}\n`)
  }
}
