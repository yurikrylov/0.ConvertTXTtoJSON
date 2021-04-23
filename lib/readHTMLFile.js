const { htmlToText } = require('html-to-text');
const fs = require('fs');

const readHTMLFile = {};
readHTMLFile.readFile = async function readFile(path) {
  let text = [];
  await fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return err;
    }
    text = htmlToText(data, { wordwrap: null }).split(/\r?\n/);
    return text;
  });
  return text;
};
module.exports = readHTMLFile;
