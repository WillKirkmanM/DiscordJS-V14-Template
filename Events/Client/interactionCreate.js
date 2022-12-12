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
        return await button.execute(interaction)
      } catch (err) {
        process.stdout.write(`[${chalk.red("ButtonHandler")}] - ${err}`)
        await interaction.reply({ content: 'There was an error while executing that button.', ephemeral: true })
      }
    }

    if (interaction.isCommand()) {
      const isSubCommand = interaction.options.getSubcommand(false)
      if (isSubCommand) {
        const subCommandName = interaction.options.getSubcommand();
        const subCommand = client.subCommands.get(`${interaction.commandName} ${subCommandName}`);

        try {
          return await subCommand.execute(interaction, client)
        } catch (err) {
          process.stdout.write(`[${chalk.red("InteractionCreate")}] (${chalk.red("SubCommand")}) - ${err}`)
        }
      }

      const command = client.interactions.get(interaction.commandName);

      try {
        return await command.execute(interaction, client);
      } catch (err) {
        process.stdout.write(`[${chalk.red("InteractionCreate")} (${chalk.red("Command")})] - ${err}\n`);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};

