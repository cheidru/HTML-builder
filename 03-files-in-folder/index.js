const fs = require('fs');
const path = require('path');

const secretFolderPath = path.resolve('03-files-in-folder', 'secret-folder');

// The callback of this method returns an array of all the file names in the directory.
// OPTIONS recursive: true - includes subdirs; withFileType: true - specifies whether 
// the files would be returned as fs.Dirent objects
const filenames = fs.readdir(secretFolderPath, (err, files) => {
    for (const file of files) {
        const itemPath = path.resolve('03-files-in-folder', 'secret-folder', file);
        // if(fs.stat(path.basename(file))
        fs.stat(itemPath, (err, stats) => {
            if (stats.isFile()) {
                const exten = path.extname(itemPath);
                const outString = `${file.slice(0, -exten.length)} - ${exten} - ${(stats.size/1024).toFixed(3)}kb`;
                console.log(outString);
            }
        });
      }
});

