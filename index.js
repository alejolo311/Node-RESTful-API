/*
 * Entry point for the API
 *
 * Author: Alejo López
 */

// Dependencies
const http = require("http");
const url = require("url");

// Setting the response of the server
let server = http.createServer((req, res) => {
  // Parse the url
  let parsedUrl = url.parse(req.url, true);
  // Get the path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, "");
  // Send the response
  res.end("Hello world \n");
  // Log the path
  console.log(`Request is recieved in path ${trimmedPath}`);
});

// Starting the server on port 3000
server.listen(3000, () => {
  console.log("the server is listening on port 3000");
});
