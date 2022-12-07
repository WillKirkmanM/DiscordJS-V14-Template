const { glob } = require("glob");
const { promisify } = require("node:util");
const proGlob = promisify(glob);

module.exports = async (client) => {
  try {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/Commands/**/*.js`);

    for (let i = 0; i < Files.length; i++) {
      delete require.cache[require.resolve(Files[i])];
      const command = require(Files[i]);
      if (command.name) {
        client.commands.set(command.name, command);
        if (command.aliases && Array.isArray(command));
        for (let j = 0; j < command.aliases.length; j++) {
          client.aliases.set(command.aliases[j], command.name)
        };
      };
    };
  }
  catch (err) {
    process.stdout.write(`${err}\n`);
  };
};
