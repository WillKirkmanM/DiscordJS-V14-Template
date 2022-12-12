import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("A Sub-Command")
    .addSubcommand((options) => options
      .setName("world")
      .setDescription("Hello World!")
    ),
};
