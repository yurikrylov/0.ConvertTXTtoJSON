const line = {};
line.parseLine = function parseLine(lineOfText, options) {
  const JSONLine = {};

  JSONLine.season = options.season;
  JSONLine.episode = options.episode;
  // const personages = ['Monica', 'Rachel', 'Joey', 'Ross', 'Chandler', 'Phoebe'];
  // TODO вся логика здесь
  const lineArr = lineOfText.split(' ');
  lineArr.forEach((value) => {
    console.log(value);
  });
  // 1. Проверяем на "["  и "("  - сцена или комментарий
  //  2. Ищем двоеточие - имя персонажа



  // Commercial Break

  // scene

  // remark

  return JSONLine;
};

module.exports = line;
