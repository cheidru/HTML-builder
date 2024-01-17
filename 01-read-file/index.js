const fs = require('fs');
const path = require('path');

fs.readFile('E:\RS-School\HTML-builder\01-read-file\text.txt', (err, data) => {
    console.log('Hello world!');
    console.log(data);
})