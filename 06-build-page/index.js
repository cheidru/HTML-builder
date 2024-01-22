const fs = require('fs');
const path = require('path');

// const dirPath = path.resolve('05-merge-styles');
const componentDirPath = path.resolve('06-build-page', 'components');
const distDirPath = path.resolve('06-build-page', 'project-dist');
const distAssetsDirPath = path.resolve('06-build-page', 'project-dist', 'assets');
const stylesDirPath = path.resolve('06-build-page', 'styles');
const assetsDirPath = path.resolve('06-build-page', 'assets');
const templateFilePath = path.resolve('06-build-page', 'template.html');
const indexFilePath = path.resolve('06-build-page', 'project-dist', 'index.html');
let indexStr = '';

const getTemplateContent = fs.createReadStream(templateFilePath, {encoding: 'utf8'});
getTemplateContent.on('data', (data) => {
    indexStr = data;
    replaceTagsWithHTML();
});

function replaceTagsWithHTML() {

}