let fs = require('fs');
const fsPromises = fs.promises;

async function readDir() {
    let response = [];
    try {
        response = await fsPromises.readdir('/opt/my_projects/d3').then((value => {
            return value
        }));
    } catch (err) {
        console.error('Error occurred while reading directory!', err);
    }
    return response;
}

async function processFiles(files) {
    for await (const file of files) {
        let parsedLines = [];
        const text = await readTextFile(file);
        const parsedText = await toLines(text);
        parsedText.map((i) => {
           parsedLines.push(parseLine(i));
        })
       createJSONFile(parsedLines);
    }
}

async function readTextFile(path) {
    let options = {};
    let result = [];
    options.season = path.slice(0, 4);
    options.episode = path.slice(4, 6);
    await fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return err
        }
        const lines = data.split(/\r?\n/);
        lines.map((i) => {
            result.push(parseLine(i, options));
        })
        createJSONFile(result);
    })
}

function toLines(text) {
    return text.split(/\r?\n/);
}

function parseLine(line, options) {
    let JSONLine = {};
    //JSON format :
// {
//  season: 1,
//  episode: 1
//  heading: true,
//  isRemark: true,
//  isScene : true,
//  personageRu: '',
//  personageEng: '',
//  textEng: '',
//  textRu: '',
//  haveNote: '',
//  note: ''
// }
    JSONLine.season = options.season;
    JSONLine.episode = options.episode;
    const personages = ['Monica', 'Rachel', 'Joey', 'Ross', 'Chandler', 'Phoebe'];
    //TODO вся логика здесь
    const lineArr = line.split(' ');
    /*    1. Проверяем на "["  и "("  - сцена или комментарий
        2. Ищем двоеточие - имя персонажа
    */
    //Commercial Break

    //scene

    // remark

    return JSONLine;
}

function createJSONFile(result) {
    return result.stringify()
}

async function start() {
    let files = await readDir().then((value) => {
        return value
    });
    if (Array.isArray(files)) {
        processFiles(files).then((value=>{}, onerror));
    }
}

start()
