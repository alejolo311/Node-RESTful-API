/*
 * router: this function is in charge of return the correct function for the recieved path
 * trimmedPath: the parsed-path to know which function select
 * Return: a function to execute the specific action
 * Author: Alejo López
 */

// Dependencies
const handlers = require("./handlers");

// Request Router
let my_router = {};

// function router
my_router.router = trimmedPath => {
  // object that contains all the available paths
  let routes = {
    sample: handlers.sample
  };

  // Check if the trimmedPath is in the available paths
  let handler =
    typeof routes[trimmedPath] !== "undefined"
      ? routes[trimmedPath]
      : handlers.notFound;
  return handler;
};
module.exports = my_router;
