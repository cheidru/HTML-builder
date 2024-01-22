const fs = require('fs');
const path = require('path');

// const dirPath = path.resolve('05-merge-styles');
const componentDirPath = path.resolve('06-build-page', 'components');
const distDirPath = path.resolve('06-build-page', 'project-dist');
const indexFilePath = path.resolve('06-build-page', 'project-dist', 'index.html');
const distAssetsDirPath = path.resolve('06-build-page', 'project-dist', 'assets');
const stylesDirPath = path.resolve('06-build-page', 'styles');
const assetsDirPath = path.resolve('06-build-page', 'assets');
const templateFilePath = path.resolve('06-build-page', 'template.html');
const articlesFilePath = path.resolve('06-build-page', 'components', 'articles.html');
const footerFilePath = path.resolve('06-build-page', 'components', 'footer.html');
const headerFilePath = path.resolve('06-build-page', 'components', 'header.html');

let indexStr = '';
let articlesStr = '';
let footerStr = '';
let headerStr = '';

fs.mkdir(distDirPath, () => {});

const getTemplateContent = fs.createReadStream(templateFilePath, {encoding: 'utf8'});
getTemplateContent.on('data', (data) => {
    indexStr = data;
});

const getArticlesContent = fs.createReadStream(articlesFilePath, {encoding: 'utf8'});
getArticlesContent.on('data', (data) => {
    articlesStr = data;
    indexStr = indexStr.replace('{{articles}}', articlesStr);
});

const getFooterContent = fs.createReadStream(footerFilePath, {encoding: 'utf8'});
getFooterContent.on('data', (data) => {
    footerStr = data;
    indexStr = indexStr.replace('{{footer}}', footerStr);
});

const getHeaderContent = fs.createReadStream(headerFilePath, {encoding: 'utf8'});
getHeaderContent.on('data', (data) => {
    headerStr = data;
    indexStr = indexStr.replace('{{header}}', headerStr);
    const getIndexFile = fs.createWriteStream(indexFilePath, {encoding: "utf-8"});
    console.log(indexStr);
    getIndexFile.write(indexStr);
});





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