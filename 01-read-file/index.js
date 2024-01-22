const fs = require('fs');
const path = require('path');

filePath = path.resolve('01-read-file', 'text.txt');

const stream = new fs.ReadStream(filePath, {encoding: 'utf8'});

stream.on('readable', function() {
    let data = stream.read();
    if(data !== null) process.stdout.write(data);
});
