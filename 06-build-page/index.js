const fs = require('fs');
const path = require('path');

const componentDirPath = path.resolve('06-build-page', 'components');
const distDirPath = path.resolve('06-build-page', 'project-dist');
const indexFilePath = path.resolve('06-build-page', 'project-dist', 'index.html');
const distAssetsDirPath = path.resolve('06-build-page', 'project-dist', 'assets');
const distStylePath = path.resolve('06-build-page', 'project-dist', 'style.css');
const stylesDirPath = path.resolve('06-build-page', 'styles');
const assetsDirPath = path.resolve('06-build-page', 'assets');
const templateFilePath = path.resolve('06-build-page', 'template.html');

let indexStr = '';
let templateStr = '';


function makeDistFolder() {
    fs.mkdir(distDirPath, (err) => {
        if (err) {
            console.log('папка существует');
            clearFolder(distDirPath)
        };
    });
}

function clearFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        for(const file of files) {
            const filePath = path.resolve(folderPath, file);            
            fs.stat(filePath, (err, stats) => {
                if (stats.isFile()) {
                    console.log('удаляем файл');
                    fs.unlink(filePath, () => {});
                } else {
                    clearFolder(filePath);
                }
            })
        }
        console.log('удаляем папку');
        fs.rmdir(folderPath, () => {});                
    })
}

function copyAsset(origFolder, copyFolder) {
    fs.readdir(origFolder, (err, files) => {
        for (const file of files) {
            const filePath = path.resolve(origFolder, file);
            fs.stat(filePath, (err, stats) => {
                if (stats.isFile()) {
                    const fileCopyPath = path.resolve(copyFolder, file);
                    fs.copyFile(filePath, fileCopyPath, () => {});
                } else {
                    const folderCopyPath = path.resolve(copyFolder, file);
                    fs.rmdir(folderCopyPath, () => {});
                    copyAsset(filePath, folderCopyPath);
                }
            })
        }
    })
}

makeDistFolder();
copyAsset(assetsDirPath, distAssetsDirPath);

function makeHTML (componFolder) {
    console.log('Компонуем html');
    fs.readdir(componFolder, (err, files) => {
        const getTemplateContent = fs.createReadStream(templateFilePath, {encoding: 'utf8'});
        getTemplateContent.on('data', (data) => {
            indexStr = data;
        });
        for (const file of files) {
            const filePath = path.resolve(componFolder, file);
            const templateName = `{{${file.slice(0, -3)}}}`;
            const templateSream = fs.createReadStream(filePath, {encoding: 'utf8'});
            templateSream.on('data', (data) => {
                templateStr = data;
                indexStr = indexStr.replace(templateName, templateStr);
            });
        }
        const getIndexFile = fs.createWriteStream(indexFilePath, {encoding: "utf-8"});
        getIndexFile.write(indexStr);
    })
}

function mergeStyles(stylesCopyPath, mergedFilePath, stylesPath) {
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


makeDistFolder();
copyAsset(assetsDirPath, distAssetsDirPath);
makeHTML (componentDirPath);
mergeStyles(distDirPath, distStylePath, stylesDirPath);