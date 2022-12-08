import { Client } from "discord.js";
import interactionHandler from "../../Utilities/interactionHandler.js";

export default {
  event: "ready",
  once: true,
  /**
  * @param {Client} client
  */
  execute(client) {
    console.log(`Bot is Ready, Logged in as: ${client.user.tag}`);

    // Start the Interaction Handler after Bot is Ready to have Access to all Guild ID's
    interactionHandler(client)
  },
};

