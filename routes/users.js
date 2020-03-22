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
  callback(200, { name: "get method in users" });
};
_users.post = (data, callback) => {
  let firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().lenght > 0
      ? data.payload.firstName.trim()
      : false;
  let lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().lenght > 0
      ? data.payload.lastName.trim()
      : false;
  let phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().lenght == 13
      ? data.payload.phone.trim()
      : false;
  let password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().lenght >= 8
      ? data.payload.password.trim()
      : false;
  let tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;
  if (firstName && lastName && phone && password && tosAgreement) {
    console.log(firstName, lastName, phone, password, tosAgreement);
  } else {
    console.log(firstName, lastName, phone, password, tosAgreement);
    callback(400, { Error: "missing required fields" });
  }
};
_users.put = (data, callback) => {};
_users.delete = (data, callback) => {};

module.exports = users;
