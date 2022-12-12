import chalk from "chalk";
import pkg from "glob";
const { glob } = pkg
import { promisify } from "node:util";
const proGlob = promisify(glob);

export default async function(client) {
  try {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/Interactions/Buttons/**/*.js`);

    for (let i = 0; i < Files.length; i++) {
      const buttonFile = await import(Files[i])
      const button = buttonFile.default

      if (button.name) {
        client.buttons.set(button.name, button)
      }
    };
    process.stdout.write(`[${chalk.blue("INFO")}] - Buttons Registered!\n`)
  } catch (err) {
    process.stdout.write(`[${chalk.red("ButtonHandler")}] - ${err}\n`);
  };
}
