const crypto = require("crypto");
const config = require("../config/config");

let hash = password => {
  if (typeof password == "string" && password.length >= 8) {
    let hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(password)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

module.exports = hash;
