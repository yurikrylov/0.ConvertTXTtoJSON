const fs = require('fs');
const createJSONFile = require('./lib/createJSONFile');
const parseLine = require('./lib/parseLine');
const readHTMLFile = require('./lib/readHTMLFile');

const fsPromises = fs.promises;
const app = {};

app.options = {
  path: './',
};
async function getFiles() {
  try {
    return await fsPromises.readdir(app.options.path);
  } catch (e) {
    return e;
  }
}

app.start = function start() {
  // eslint-disable-next-line no-console
  const fileNames = getFiles().then((value) => value).catch((err) => console.log(err));

  fileNames.forEach((name) => {
    const lines = readHTMLFile.readFile(name);
    const oLines = lines.map((line) => parseLine.parseLine(line, app.options));
    createJSONFile.create(oLines);
  });
};
app.start();
