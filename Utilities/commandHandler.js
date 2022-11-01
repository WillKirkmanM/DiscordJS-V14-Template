const { glob } = require("glob");
const { promisify } = require("node:util");
const { stdout, cwd } = require("node:process");
const proGlob = promisify(glob);

module.exports = async (client, err) => {
  if (err) return stdout.write(`${err}\n`);

  const Files = await proGlob(`${cwd().replace(/\\/g, "/")}/Commands/**/*.js`);
  Files.forEach((file) => delete require.cache[require.resolve(file)]);

  Files.forEach((file) => {
    const command = require(file);
    if (command.name) {
      client.commands.set(command.name, command);
      if (command.aliases && Array.isArray(command))
        command.aliases.foreach((alias) =>
          client.aliases.set(alias, command.name)
        );
    }
  });
};
