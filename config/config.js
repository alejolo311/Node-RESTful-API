/*
 * Parser: this function is in charge of parse all the info present in the request
 * and store the results in a objetc
 * req: the arg of the func is the full request of the server.
 * Return: returns a object with the parsed-data.
 * Author: Alejo López
 */

// Container for all environments
var environments = {};

// Staging (default) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging",
  hashingSecret: "thisisthesecret"
};

// Production environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production",
  hashingSecret: "thisisthesecret"
};

// Determine which environment was passed as a command-line argument
let currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Check that the current environment is one of the environments above, if not default to staging
let environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

// Export the module
module.exports = environmentToExport;
