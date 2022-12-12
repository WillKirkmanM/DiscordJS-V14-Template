import { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("A Simple Interaction Command"),
  /**
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('TestButton')
          .setLabel('Click me!')
          .setStyle(ButtonStyle.Primary),
      );

    await interaction.reply({ content: 'The Default Test Interaction With a Button?', components: [row] });
  },
};

