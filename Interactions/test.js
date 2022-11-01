const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("A Simple Interaction Command"),
  async execute(interaction) {
    await interaction.reply("A Simple Test Slash Command, To edit this text, go into Interactions/test.js");
  },
};

