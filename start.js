const fs = require('fs');
const createJSONFile = require('./lib/createJSONFile');
const parseLine = require('./lib/parseLine');
const readHTMLFile = require('./lib/readHTMLFile');

const fsPromises = fs.promises;
const app = {};

app.options = {
  dir: './txt',
  path: './txt/example',
};
async function getFiles() {
  try {
    return await fsPromises.readdir(app.options.path);
  } catch (e) {
    return e;
  }
}
async function startAsync() {
  // eslint-disable-next-line no-console
  const fileNames = await getFiles().then((value) => value).catch((err) => console.log(err));

  async function mapForEach(files, create()) {
    for (let i = 0; i < fileNames.length; i++) {
      await create(fileNames[i]);
    }
  }
  function create(name) {
    const lines = readHTMLFile.readFile(`${app.optipons.dir}${name}`).catch((err) => console.log(err));
    const oLines = lines.map((line) => parseLine.parseLine(line, app.options));
    createJSONFile.create(oLines);
  }
  await mapForEach(fileNames);
}
app.start = function start() {
  startAsync().catch((err) => console.log(err));
};
app.start();
