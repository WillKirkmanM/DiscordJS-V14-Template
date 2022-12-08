import { Client, Message } from "discord.js";
import config from "../../Configs/config.js";
const prefix = config.prefix;

export default {
  event: "messageCreate",
  /**
    * @param {Client} client
    * @param {Message} message
    */
  execute: async (message, client) => {
    if (message.content === `<@${client.user.id}>`) { message.reply(`The Prefix is: ${prefix}`) }
    if (message.content.startsWith(prefix) === false) return;
    if (message.author.bot === true) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (command.guildOnly && message.channel.type !== "text") {
      return message.reply("I can't execute that command inside DMs!");
    }

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
    }
    try {
      command.execute(message, args, client);
    } catch (err) {
      process.stdout.write(`MessageCreate: ${err}\n`);
      message.reply("There was an error trying to execute that command!");
    }
  },
};
