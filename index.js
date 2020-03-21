/*
 * Entry point for the API
 *
 * Author: Alejo López
 */

// Dependencies
const http = require("http");
const { parse } = require("./parser");
const { router } = require("./router");

// Setting the response of the server
let server = http.createServer((req, res) => {
  // Parse all the request and store it in a object
  let data = parse(req);

  // Send the path to the router to obtain the correct handler for each case
  let handler = router(data.trimmedPath);

  // Call the handler to execute the action required by te user
  handler(data, (statusCode, payload) => {
    // Check if the handler return the status code
    statusCode = typeof statusCode == "number" ? statusCode : 200;

    // Check if the handler return the payload
    payload = typeof payload == "object" ? payload : {};

    // Convert the payload-object in a string
    let payloadString = JSON.stringify(payload);

    // Set the content type header in json format
    res.setHeader("Content-Type", "application/json");

    // Reponse the status code
    res.writeHead(statusCode);

    // Response to the client
    res.end(payloadString);
  });
});

// Starting the server on port 3000
server.listen(3000, () => {
  console.log("the server is listening on port 3000");
});
