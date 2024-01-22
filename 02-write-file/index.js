const fs = require('fs');
const path = require('path');
const readLN = require('readline');

filePath = path.resolve('02-write-file', 'text.txt');

fs.open(filePath, 'w', (err) => {
    if (err) process.stdout.write('Не могу создать файл');
});

const writeToFile = fs.createWriteStream(filePath,  {encoding: "utf-8", flags:"a" });

const readUser = readLN.createInterface({
    input: process.stdin,
    output: process.stdout,
});

process.on('exit', () => {
    process.stdout.write("======= It was pleasure to work with you! =========");
});

function writeAnswer(){
    readUser.question("Write any text and press 'Enter': ", (answer) => {
        if(answer === 'exit') {
            process.exit();
        } 
        writeToFile.write(answer);
        writeAnswer();
    })
}

writeAnswer();


