const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const createJSONFile = require('./lib/createJSONFile');
const parseLine = require('./lib/parseLine');
const readHTMLFile = require('./lib/readHTMLFile');

const app = {};

app.options = {
  dir: './txt',
  path: './txt/example',
};
function getFiles() {
  try {
    return fsPromises.readdir(app.options.path);
  } catch (e) {
    return e;
  }
}
async function startAsync() {
  // eslint-disable-next-line no-console
  const fileNames = await getFiles().then((value) => value).catch((err) => console.log(err));

  for await (const name of fileNames) {
    const lines = readHTMLFile.readFile(path.resolve(`${app.options.path}`, `${name}`)).catch((err) => console.log(err));
    const oLines = lines.map((line) => parseLine.parseLine(line, app.options));
    createJSONFile.create(oLines);
  }
}
app.start = function start() {
  startAsync().catch((err) => console.log(err));
};

app.start();
