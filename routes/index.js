const ping = require("./ping");
const notFound = require("./notFound");

let routes = {};

routes.ping = ping;
routes.notFound = notFound;

module.exports = routes;
