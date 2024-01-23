const fs = require('fs');
const path = require('path');
const mergeStyleModule = require('./05-merge-styles');
const copyAssets = require('./04-copy-directory');

const componentDirPath = path.resolve('06-build-page', 'components');
const distDirPath = path.resolve('06-build-page', 'project-dist');
const indexFilePath = path.resolve('06-build-page', 'project-dist', 'index.html');
const distAssetsDirPath = path.resolve('06-build-page', 'project-dist', 'assets');
const distStylePath = path.resolve('06-build-page', 'project-dist', 'style.css');
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

mergeStyleModule.mergeStyles(distDirPath, distStylePath, stylesDirPath);
copyAssets.dirCopy(distDirPath, assetsDirPath, distAssetsDirPath);
