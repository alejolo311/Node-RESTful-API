const ping = require("./ping");
const notFound = require("./notFound");
const users = require("./users");

let routes = {};

routes.ping = ping;
routes.notFound = notFound;
routes.users = users;

module.exports = routes;
