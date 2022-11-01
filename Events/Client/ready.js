module.exports = {
  event: "ready",
  once: true,
  execute(client) {
    console.log(`Bot is Ready, Logged in as: ${client.user.tag}`);

    // Start the Interaction Handler after Bot is Ready to have Access to all Guild ID's
    const interactionsHandler = require("../../Utilities/interactionHandler.js");
    interactionsHandler(client);
  },
};

