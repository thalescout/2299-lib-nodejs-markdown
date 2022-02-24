const chalk = require("chalk");
const fs = require("fs");

console.log(chalk.blue("vamos começar!"));

function handleError(err) {
  throw new Error(chalk.red(err.code, "File not found"));
}

function getLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  let links = [];
  let link;
  while ((link = regex.exec(text)) !== null) {
    const newLink = {
      [link[1]]: link[2],
    }
    console.log(chalk.cyan(newLink));
    links.push(newLink);
  }

  return links;
}

async function getFile(path) {
  const encoding = "utf-8";
  try {
    const text = await fs.promises.readFile(path, encoding);
    return text;
  } catch (err) {
    handleError(err);
  }
}

async function FindLinks(filePath) {
  const fileText = await getFile(filePath);
  //console.log(chalk.green(fileText));
  const fileLinks = getLinks(fileText);
  console.log(chalk.yellow(fileLinks));
}

FindLinks("./arquivos/texto1.md");
