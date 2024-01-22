const fs = require('fs');
const path = require('path');

// const dirPath = path.resolve('05-merge-styles');
const stylesDirPath = path.resolve('05-merge-styles', 'styles');
const stylesCopyDirPath = path.resolve('05-merge-styles', 'project-dist');
const bundleFilePath = path.resolve('05-merge-styles', 'project-dist', 'bundle.css');

// Check if project-dist folder exists and create/re-create it
fs.readdir(stylesCopyDirPath, (err, items) => {
    if(items.includes('bundle.css')) {
        fs.unlink(bundleFilePath, () => {});
    }
    fs.open(bundleFilePath, 'w', (err) => {
        if(err) console.log('Ошибка создания файла bundle.css')
    });
    const writeToFile = fs.createWriteStream(bundleFilePath,  {encoding: "utf-8", flags:"a" });
    fs.readdir(stylesDirPath, (err, files) => {
        for (const file of files) {
            const filePath = path.resolve(stylesDirPath, file);
            fs.stat(filePath, (err, stats) => {
                if (stats.isFile() && path.extname(filePath) === '.css') {
                    const readFromFile = fs.createReadStream(filePath,  {encoding: "utf-8"});
                    readFromFile.on('data', (data) => {
                        writeToFile.write(data);
                    });
                }
            });
        }
    })
})

