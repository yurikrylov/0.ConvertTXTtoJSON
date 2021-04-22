const fs = require('fs');
const fsPromises = fs.promises;
const createJSONFile = require('./lib/createJSONFile');
const parseLine = require('./lib/parseLine');
const readHTMLFile = require('./lib/readHTMLFile');
let app = {};

app.options={
    path:'./'
};

app.start = function() {
    let fileNames;
    try {
        fileNames =  fsPromises.readdir(app.options.path);
    }
    catch(err){
        console.error(err);
    }
    fileNames.forEach((name)=>{
        let lines = readHTMLFile.readFile(name);
        let oLines = lines.map((line)=>{
           return parseLine.parseLine(line,app.options);
        });
        createJSONFile.create(oLines);
    })
}
app.start()

