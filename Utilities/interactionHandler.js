const { REST, Routes } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("node:util");
const { stdout, env, cwd } = require("node:process");
const proGlob = promisify(glob);

module.exports = async (client, err) => {
  if (err) return stdout.write(`${err}\n`);

  const Files = await proGlob(`${cwd().replace(/\\/g, "/")}/Interactions/**/*.js`);
  Files.forEach((file) => delete require.cache[require.resolve(file)]);

  client.interactionsArray = [];
  Files.forEach((file) => {
    const interaction = require(file);
    client.interactions.set(interaction.data.name, interaction);
    client.interactionsArray.push(interaction.data.toJSON());
  });

  const rest = new REST({ version: "10" }).setToken(env.TOKEN);

  (async () => {
    try {
      stdout.write("Refreshing Slash Command List!\n");
      const guildIds = await client.guilds.cache.map((guild) => guild.id);
      const clientId = await client.user.id;
      guildIds.forEach(async (guildId) => {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: client.interactionsArray,
        });
      });

      stdout.write("Successfully Refreshed Slash Command List!");
    } catch (error) {
      stdout.write(`${error}\n`);
    }
  })();
};
