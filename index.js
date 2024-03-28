const fs = require('fs');
let logFile = 'C:/priceChecker/objects/log.log';
let result = 'C:/priceChecker/objects/result.txt';
let searchPattern = 'DEBUG sm2000::CDbArticleInfo::GetBarcodeInfo - Done.';
// let searchPattern = 'DEBUG sm2000::CDbArticleInfo::GetBarcodeInfo - Done.';

fs.readFile(logFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let lines = data.split('\n');
  let arrayResults = [];

  lines.forEach((line) => {
    if (line.includes(searchPattern)) {
      const date = line.match(/\d{2}\.\d{2}\.\d{4}/)[0];
      const time = line.match(/\d{2}:\d{2}:\d{2}/)[0];
      const barcode = line.match(/Barcode = (\d+)/)[1];

      const resultString = {
        Barcode: barcode,
        Date: date,
        Time: time
      };

      const existingIndex = arrayResults.findIndex(obj => obj.Barcode === resultString.Barcode);
      if (existingIndex !== -1) {
        // Если объект уже существует, обновляем его дату и время
        arrayResults[existingIndex].Date = date;
        arrayResults[existingIndex].Time = time;
      } else {
        // Если объект не существует, добавляем его в массив
        arrayResults.push(resultString);
      }
    }
  });

  const formattedResults = arrayResults.map(obj => JSON.stringify(obj)).join('\n');

  fs.writeFile(result, formattedResults, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Результаты сохранены в файл result.txt');
  });
});