const { glob } = require("glob");
const { promisify } = require("node:util");
const proGlob = promisify(glob);

module.exports = async (client) => {
  try {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/Events/**/*.js`);

    for (let i = 0; i < Files.length; i++) {
      delete require.cache[require.resolve(Files[i])];

      const eventFunction = require(Files[i]);
      if (eventFunction.disabled) return;

      const event = eventFunction.event || Files[i].split(".")[0];
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
        process.stdout.write(`${error.stack}\n`);
      }
    }
  } catch (err) {
    process.stdout.write(`${err}\n`)
  }
}
