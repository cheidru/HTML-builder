const fs = require('fs');
const path = require('path');

console.log('Hello world!');
filePath = path.resolve('01-read-file', 'text.txt');

fs.readFile(filePath,'utf8', (err, data) => {
    console.log(filePath);
    console.log('читаю данные из файла');
    console.log(data);
})