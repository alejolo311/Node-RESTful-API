const fs = require("fs");
const path = require("path");

let fileStorage = {};

fileStorage.baseDir = path.join(__dirname, "/../.data/");

fileStorage.create = (dir, file, data, callback) => {
  fs.open(
    `${fileStorage.baseDir}${dir}/${file}.json`,
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        let stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, err => {
          if (err) {
            callback("error writing in the file");
          } else {
            fs.close(fileDescriptor, err => {
              if (!err) {
                callback(false);
              } else {
                callback("and error occur closing the file");
              }
            });
          }
        });
      } else {
        callback("Could not create a new file");
      }
    }
  );
};

module.exports = fileStorage;
