const fs = require("fs");
const path = require("path");
const { jsonToObject } = require("../helpers");

let fileStorage = {};

fileStorage.baseDir = path.join(__dirname, "/../.data/");

fileStorage.create = (dir, file, data, callback) => {
  fs.open(
    `${fileStorage.baseDir}${dir}/${file}.json`,
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        let stringData = JSON.stringify(data, null, 4);
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
fileStorage.read = (dir, file, callback) => {
  fs.readFile(
    `${fileStorage.baseDir}${dir}/${file}.json`,
    "utf-8",
    (err, data) => {
      if (!err && data) {
        let parsedObject = jsonToObject(data);
        callback(false, parsedObject);
      } else {
        callback(err, data);
      }
    }
  );
};
fileStorage.update = (dir, file, data, callback) => {
  fs.open(
    `${fileStorage.baseDir}${dir}/${file}.json`,
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        let stringData = JSON.stringify(data, null, 4);
        fs.ftruncate(fileDescriptor, err => {
          if (!err) {
            fs.writeFile(fileDescriptor, stringData, err => {
              if (err) {
                callback("error updating in the file");
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
            callback("imposible truncate the file");
          }
        });
      } else {
        callback("could not open the file to update");
      }
    }
  );
};

fileStorage.delete = (dir, file, callback) => {
  fs.unlink(`${fileStorage.baseDir}${dir}/${file}.json`, err => {
    if (!err) {
      callback(false);
    } else {
      callback("could not delete the file");
    }
  });
};

module.exports = fileStorage;
