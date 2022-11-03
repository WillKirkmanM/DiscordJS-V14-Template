const { glob } = require("glob");
const { promisify } = require("node:util");
const { stdout, cwd } = require("node:process");
const proGlob = promisify(glob);

module.exports = async (client, err) => {
  if (err) return stdout.write(`${err}\n`);

  const Files = await proGlob(`${cwd().replace(/\\/g, "/")}/Events/**/*.js`);
  Files.forEach((file) => delete require.cache[require.resolve(file)]);

  Files.forEach((file) => {
    const eventFunction = require(file);
    if (eventFunction.disabled) return;

    const event = eventFunction.event || file.split(".")[0];
    console.log(file.split("."[0]))
    const emitter =
      (typeof eventFunction.emitter === "string"
        ? client[eventFunction.emitter]
        : eventFunction.emitter) || client;
    const once = eventFunction.once;

    try {
      emitter[once ? "once" : "on"](event, (...args) =>
        eventFunction.execute(...args, client)
      );
    } catch (error) {
      stdout.write(`${error.stack}\n`);
    }
  });
};
