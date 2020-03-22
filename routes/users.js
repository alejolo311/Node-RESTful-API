// Dependencies
const fileStorage = require("../lib/fileStorage");
const helpers = require("../helpers");

// users Handler
users = (data, callback) => {
  let availableMehotds = ["get", "post", "put", "delete"];
  if (availableMehotds.indexOf(data.method) > -1) {
    _users[data.method](data, callback);
  } else {
    callback(405);
  }
};

let _users = {};

_users.get = (data, callback) => {
  let phone =
    typeof data.queryString.phone == "string" &&
    data.queryString.phone.trim().length == 10
      ? data.queryString.phone.trim()
      : false;
  if (phone) {
    fileStorage.read("users", phone, (err, data) => {
      if (!err && data) {
        delete data.password;
        callback(200, data);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { Error: "missing required fields" });
  }
};
_users.post = (data, callback) => {
  let firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  let lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  let phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 13
      ? data.payload.phone.trim()
      : false;
  let password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length >= 8
      ? data.payload.password.trim()
      : false;
  let tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;
  if (firstName && lastName && phone && password && tosAgreement) {
    fileStorage.read("users", phone, (err, data) => {
      if (err) {
        let hashedpassword = helpers.hash(password);
        if (hashedpassword) {
          let userData = {
            firstName: firstName,
            lastName: lastName,
            indicator: phone.slice(0, 3),
            phone: phone.slice(3, 13),
            password: hashedpassword,
            tosAgreement: true
          };
          fileStorage.create("users", phone.slice(3, 13), userData, err => {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { Error: "Could not create a new user" });
            }
          });
        } else {
          callback(500, { Error: "Imposible Hash the password" });
        }
      } else {
        callback(400, { Error: "User alredy exists" });
      }
    });
  } else {
    console.log(firstName, lastName, phone, password, tosAgreement);
    callback(400, { Error: "missing required fields" });
  }
};
_users.put = (data, callback) => {
  let phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;
  let firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  let lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  let password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length >= 8
      ? data.payload.password.trim()
      : false;
  if (phone) {
    if (firstName || lastName || password) {
      fileStorage.read("users", phone, (err, data) => {
        if (!err && data) {
          if (firstName) {
            data.firstName = firstName;
          }
          if (lastName) {
            data.lastName = lastName;
          }
          if (password) {
            data.password = helpers.hash(password);
          }
          fileStorage.update("users", phone, data, err => {
            if (!err) {
              callback(200);
            } else {
              callback(500, { Error: "could not update the user" });
            }
          });
        } else {
          callback(404, { Error: "the specified user doesnt exists" });
        }
      });
    } else {
      callback(400, { Error: "missing required fields to update" });
    }
  } else {
    callback(400, { Error: "missing required fields" });
  }
};
_users.delete = (data, callback) => {
  let phone =
    typeof data.queryString.phone == "string" &&
    data.queryString.phone.trim().length == 10
      ? data.queryString.phone.trim()
      : false;
  if (phone) {
    fileStorage.read("users", phone, (err, data) => {
      if (!err && data) {
        fileStorage.delete("users", phone, err => {
          if (!err) {
            callback(200);
          } else {
            callback(400, { Error: "Imposible delete the user" });
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { Error: "missing required fields" });
  }
};

module.exports = users;
