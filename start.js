const fs = require('fs');
const path = require('path');
const { htmlToText } = require('html-to-text');

const fsPromises = fs.promises;
const parseLine = require('./lib/parseLine');

const app = {};
let JSONDB;

const createJSONFile = {};

const addToJSONDB = function create(lines) {
  const data = JSON.parse(JSONDB);
  data.push(lines);
  JSONDB = JSON.stringify(data);
};

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
  const opts = {};
  opts.season = name.slice(0, 2);
  opts.episode = name.slice(2, 2);
  const oLines = await lines.map((line) => parseLine.parseLine(line, opts));
  return oLines;
}

async function startAsync() {
  const newFileName = createJSONFile.create();
  // eslint-disable-next-line no-console
  const fileNames = await getFiles().then((value) => value).catch((err) => console.log(err));
  // eslint-disable-next-line
  for await (const name of fileNames) {
    const oLines = wrapper(name);
    addToJSONDB(newFileName, oLines);
  }
}

app.start = function start() {
  // eslint-disable-next-line no-console
  startAsync().catch((err) => console.log(err));
};

app.start();
