/*
 * router: this function is in charge of return the correct function for the recieved path
 * trimmedPath: the parsed-path to know which function select
 * Return: a function to execute the specific action
 * Author: Alejo López
 */

// Dependencies
const handlers = require("../routes");

// Request Router
let my_router = {};

// function router
my_router.router = (data, res) => {
  // object that contains all the available paths
  let routes = {
    ping: handlers.ping,
    users: handlers.users
  };

  // Check if the trimmedPath is in the available paths
  let handler =
    typeof routes[data.trimmedPath] !== "undefined"
      ? routes[data.trimmedPath]
      : handlers.notFound;
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
};
module.exports = my_router;
