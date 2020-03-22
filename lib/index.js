const { parse } = require("./parser");
const { router } = require("./router");
const fileStorage = require("./fileStorage");

let lib = {};

lib.parser = parse;
lib.router = router;
lib.fileStorage = fileStorage;

module.exports = lib;
