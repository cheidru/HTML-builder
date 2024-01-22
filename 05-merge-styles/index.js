const fs = require('fs');
const path = require('path');

const dirPath = path.resolve('05-merge-styles');
const stylesDirPath = path.resolve('05-merge-styles', 'styles');
const styleCopyDirPath = path.resolve('05-merge-styles', 'project-dist');

// Check if project-dist folder exists and create/re-create it
fs.readdir(dirPath, () => {
    if(items.includes('project-dist')) {
        recomposeProjectDist();
    } else {
        composeProjectDist();
    }    
})

function composeProjectDist() {
    fs.mkdir(styleCopyDirPath, () => {});
    fs.readdir(stylesDirPath, (err, files) => {
        for (const file of files) {




            const filePath = path.resolve(fileDirPath, file);
            const fileCopyPath = path.resolve(fileCopyDirPath, file);
            fs.copyFile(filePath, fileCopyPath, () => {});


            
        }
    })
}

function recomposeProjectDist() {
    fs.readdir(styleCopyDirPath, (err, files) => {
        for(const file of files) {
            const filePath = path.resolve(styleCopyDirPath, file);
            fs.unlink(filePath, () => {});
        }
        fs.rmdir(styleCopyDirPath, () => {
            composeProjectDist();
        });
    });
}