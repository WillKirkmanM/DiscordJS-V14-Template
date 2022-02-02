const fs = require("fs");

module.exports = {
  event: "ready",
  once: true,
  execute(client) {
    console.log(`Bot is Ready, Logged in as: ${client.user.tag}`);

    // Start the Interaction Handler after Bot is Ready to have Access to all Guild ID's
    fs.readdir("./interactions/", (err, files) => {
      const interactionsHandler = require("./../handler/interactionHandler");
      interactionsHandler(err, files, client);
    });
  },
};
