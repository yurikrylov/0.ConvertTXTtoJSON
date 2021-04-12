let {readFile, readdir} = require('fs');


async function readTextFiles(path) {
    await readdir(path, (err, files) => {
        if (err) return err
        return files
    });
}

async function readTextFile(path) {
    let options = {};
    let result = [];
    options.season = path.slice(0,4);
    options.episode = path.slice(4,6);
    await readFile(path, 'utf8', (err, data) => {
        if (err) {
            return err
        }
        const lines = data.split(/\r?\n/);
        lines.map((i) => {
            result.push(parseLine(i,options));
        })
        createJSONFile(result);
    })
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
    JSONLine.season=options.season;
    JSONLine.episode=options.episode;
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

function start() {
    let files = readTextFiles('myTXTFiles');
    forEach(files).then(r => console.log('end'));
}
function toLines(text){
     let a =  text.split(/\r?\n/);
     return a;
}
async function forEach(files){

    for await (const file of files) {
         let parsedLines = [];
         const text = await readTextFile(file);
         const parsedText = await toLines(text);
         parsedText.map((i) => {
             i |> parseLine |> parsedLines.push;
        })
        createJSONFile(parsedLines);
    }
}
start()