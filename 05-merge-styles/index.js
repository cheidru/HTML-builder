const fs = require('fs');
const path = require('path');

const stylesDirPath = path.resolve('05-merge-styles', 'styles');
const stylesCopyDirPath = path.resolve('05-merge-styles', 'project-dist');
const bundleFilePath = path.resolve('05-merge-styles', 'project-dist', 'bundle.css');


const mergeStyles = function(stylesCopyPath, mergedFilePath, stylesPath) {
    fs.readdir(stylesCopyPath, (err, items) => {
        if(items.includes('bundle.css')) {
            fs.unlink(mergedFilePath, () => {});
        }
        fs.open(mergedFilePath, 'w', (err) => {
            if(err) console.log('Ошибка создания файла bundle.css')
        });
        const writeToFile = fs.createWriteStream(mergedFilePath,  {encoding: "utf-8", flags:"a" });
        fs.readdir(stylesPath, (err, files) => {
            for (const file of files) {
                const filePath = path.resolve(stylesPath, file);
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
}

mergeStyles(stylesCopyDirPath, bundleFilePath, stylesDirPath);

