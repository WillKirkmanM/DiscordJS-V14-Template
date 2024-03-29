import chalk from "chalk";
import pkg from "glob";
const { glob } = pkg
import { promisify } from "node:util";
const proGlob = promisify(glob);
import { pathToFileURL } from "node:url";
import { client } from "../index.js";

try {
  const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/Commands/**/*.js`);

  for (let i = 0; i < Files.length; i++) {
    Files[i] = pathToFileURL(Files[i])

    const commandFile = await import(Files[i])
    const command = commandFile.default

    if (command.name) {
      client.commands.set(command.name, command);
      if (command.aliases && Array.isArray(command)) {
        for (let j = 0; j < command.aliases.length; j++) {
          client.aliases.set(command.aliases[j], command.name)
        }
      };
    };
  };
  process.stdout.write(`[${chalk.blue("INFO")}] - Commands Loaded!\n`)
}
catch (err) {
  process.stdout.write(`[${chalk.red("CommandHandler")}] - ${err}\n`);
};
