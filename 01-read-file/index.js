// Command line node 01-read-file\index.js
// https://imnotgenius.com/25-potoki-dannyh-v-node-js-fs-readstream/
const fs = require('fs');
const path = require('path');

console.log('Hello world!');
filePath = path.resolve('01-read-file', 'text.txt');

// fs.readFile(filePath,'utf8', (err, data) => {
//     console.log(filePath);
//     console.log('читаю данные из файла');
//     console.log(data);
// });

const stream = new fs.ReadStream(filePath, {encoding: 'utf8'});


// If the end of the stream has been reached, calling stream.read() will 
// return null and trigger the 'end' event. This is also true if there 
// never was any data to be read (e.g. empty file).


stream.on('readable', function() {
    let data = stream.read();
    if(data !== null) process.stdout.write(data);
});

stream.on('end', function() {
    console.log('The End');
})