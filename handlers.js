/*
 *
 *
 * Author: Alejo López
 */

// Define the handlers
let handlers = {};

// Sample Handler
handlers.sample = (data, callback) => {
  callback(406, { name: "sample handler" });
};
// not found Handler
handlers.notFound = (data, callback) => {
  callback(404);
};

module.exports = handlers;
