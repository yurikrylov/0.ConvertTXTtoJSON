'use strict';
const {htmlToText} = require('html-to-text');
const fs = require('fs');
let readHTMLFile = {};
readHTMLFile.readFile = function (path) {
    let text = [];
     fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return err
        }
        text = htmlToText(data,{wordwrap:null}).split(/\r?\n/);
    })
    return text;
}
module.exports = readHTMLFile;
