const fs = require('fs');
const path = require('path');

const dirPath = path.resolve('04-copy-directory');
const fileDirPath = path.resolve('04-copy-directory', 'files');
const fileCopyDirPath = path.resolve('04-copy-directory', 'files-copy');


function dirCopy(distFolder, origFolder, copyFolder) {
    fs.readdir(distFolder, (err, items) => {
        if(items.includes(path.basename(copyFolder))) {
            fs.readdir(copyFolder, (err, files) => {
                for(const file of files) {
                    const filePath = path.resolve(copyFolder, file);
                    fs.unlink(filePath, () => {});
                }
                fs.rmdir(copyFolder, () => {});
            })
        }
        fs.mkdir(copyFolder, () => {});
        fs.readdir(origFolder, (err, files) => {
            for (const file of files) {
                const filePath = path.resolve(origFolder, file);
                const fileCopyPath = path.resolve(copyFolder, file);
                fs.copyFile(filePath, fileCopyPath, () => {});
            }
        })
    })
}

dirCopy(dirPath, fileDirPath, fileCopyDirPath);