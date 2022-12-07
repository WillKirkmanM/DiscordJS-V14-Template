const { Client, CommandInteraction } = require("discord.js");

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
      process.stdout.write(`${error}\n`);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

