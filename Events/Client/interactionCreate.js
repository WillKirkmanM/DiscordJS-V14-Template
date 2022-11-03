const { Client, CommandInteraction } = require("discord.js");
const { stdout } = require("node:process");

module.exports = {
  event: "interactionCreate",
  /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */
  execute: async (interaction, client) => {
    if (!interaction.isCommand()) return;

    const command = client.interactions.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      stdout.write(`${error}\n`);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

