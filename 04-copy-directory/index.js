const fs = require('fs');
const path = require('path');

const dirPath = path.resolve('04-copy-directory');
const fileDirPath = path.resolve('04-copy-directory', 'files');
const fileCopyDirPath = path.resolve('04-copy-directory', 'files-copy');

fs.readdir(dirPath, (err, items) => {
    if(items.includes('files-copy')) {
        rewriteCopyFilesDir();
    } else {
        copyFilesDir();
    }    
})

function copyFilesDir() {
    fs.mkdir(fileCopyDirPath, () => {});
    fs.readdir(fileDirPath, (err, files) => {
        for (const file of files) {
            const filePath = path.resolve(fileDirPath, file);
            const fileCopyPath = path.resolve(fileCopyDirPath, file);
            fs.copyFile(filePath, fileCopyPath, () => {});
        }
    })
}

function rewriteCopyFilesDir() {
    fs.readdir(fileCopyDirPath, (err, files) => {
        for(const file of files) {
            const filePath = path.resolve(fileCopyDirPath, file);
            fs.unlink(filePath, () => {});
        }
        fs.rmdir(fileCopyDirPath, () => {
            copyFilesDir();
        });
    });
}