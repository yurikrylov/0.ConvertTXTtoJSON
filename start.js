const fs = require('fs');
const path = require('path');
const { htmlToText } = require('html-to-text');

const fsPromises = fs.promises;
const parseLine = require('./lib/parseLine');
const createJSONFile = require('./lib/createJSONFile');

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

async function readFile(pathToFile) {

  const data = await fsPromises.readFile(pathToFile, 'utf-8');
  const text = await htmlToText(data, { wordwrap: null }).split(/[\r\n]+/);
  return text;
}

async function wrapper(name) {
  const lines = await readFile(path.resolve(`${app.options.path}`, `${name}`));
  const oLines = await lines.map((line) => parseLine.parseLine(line, app.options));
  createJSONFile.create(oLines);
}

async function startAsync() {
  // eslint-disable-next-line no-console
  const fileNames = await getFiles().then((value) => value).catch((err) => console.log(err));

  for await (const name of fileNames) {
    return wrapper(name);
  }
}

app.start = function start() {
  startAsync().catch((err) => console.log(err));
};

app.start();
