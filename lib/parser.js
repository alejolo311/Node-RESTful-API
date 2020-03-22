/*
 * Parser: this function is in charge of parse all the info present in the request
 * and store the results in a objetc
 * req: the arg of the func is the full request of the server.
 * Return: returns a object with the parsed-data.
 * Author: Alejo López
 */

// Dependencies
const url = require("url");

var info = {};
// Parser
info.parse = req => {
  let info = {};
  // Parse the url
  let parsedUrl = url.parse(req.url, true);

  // Get the path
  let path = parsedUrl.pathname;
  info.trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Ge the Querystring
  info.queryString = parsedUrl.query;

  // Get the HTTP method
  info.method = req.method.toLowerCase();

  // Get the headers
  info.headers = req.headers;
  return info;
};

module.exports = info;
