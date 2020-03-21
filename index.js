/*
 * Entry point for the API
 *
 * Author: Alejo López
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// Setting the response of the server
let server = http.createServer((req, res) => {
  // Parse the url
  let parsedUrl = url.parse(req.url, true);

  // Get the path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Ge the Querystring
  let queryString = parsedUrl.query;

  // Get the HTTP method
  let method = req.method.toLowerCase();

  // Get the headers
  let headers = req.headers;

  // get the Payload
  let decoder = new StringDecoder("utf-8");
  let payloadBuffer = "";
  req.on("data", data => {
    payloadBuffer += decoder.write(data);
  });
  req.on("end", () => {
    payloadBuffer += decoder.end();

    // Send the response
    res.end("Hello world \n");
  });
});

// Starting the server on port 3000
server.listen(3000, () => {
  console.log("the server is listening on port 3000");
});
