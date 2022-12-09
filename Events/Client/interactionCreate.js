import { Client, CommandInteraction } from "discord.js";
import chalk from "chalk";

export default {
  event: "interactionCreate",
  /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */
  execute: async (interaction, client) => {
    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId)
      if (!button) return

      try {
        await button.execute(interaction)
      } catch (err) {
        process.stdout.write(`[${chalk.red("ButtonHandler")}] - ${err}`)
        await interaction.reply({ content: 'There was an error while executing that button.', ephemeral: true })
      }
    }

    if (interaction.isCommand()) {

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
    }
  },
};

