/*
 * Entry point for the API
 *
 * Author: Alejo López
 */

// Dependencies
const http = require("http");
const https = require("https");
const { parser, router } = require("./lib");
const { jsonToObject } = require("./helpers");
const config = require("./config/config.js");
const fs = require("fs");
const { StringDecoder } = require("string_decoder");

let httpServer = http.createServer((req, res) => {
  // Parse all the request and store it in a object
  let data = parser(req);
  // get the Payload
  let decoder = new StringDecoder("utf-8");
  let payload = "";
  req.on("data", data => {
    payload += decoder.write(data);
  });
  req.on("end", () => {
    payload += decoder.end();
    data.payload = jsonToObject(payload);
    router(data, res);
  });
});
// Starting the HTTP server
httpServer.listen(config.httpPort, () => {
  console.log(`the server is listening on port ${config.httpPort}`);
});

// instance of HTTPS server
let httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem")
};
let httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  // Parse all the request and store it in a object
  let data = parser(req);

  // Send the path and the data to the router
  //router(data, res);
});
// Starting the HTTPS server
httpsServer.listen(config.httpsPort, () => {
  console.log(`the server is listening on port ${config.httpsPort}`);
});
