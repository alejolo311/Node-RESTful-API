# Node-RESTful-API

This is a personal project that aims to build a RESTful api in node without the use of any external library, only using vanilla javascript and the different tools that the node core can provide me.
This api aims to give the user an effective way to check if a specific url is online or not.

## Goals

- [ ] The API listens on a PORT and accepts incoming HTTP requests for POST, GET, PUT, DELETE and HEAD.
- [ ] The API allows a client to connect, then create a new user, then edit and delete the user.
- [ ] The API allows a user to "sign in" which gives them a token that they can use for subsequent authenticated requests.
- [ ] The API allows the user to "sign out" which invalidates their token.
- [ ] The API allows a signed-in user to user their token to create a new "check"
- [ ] The API allows a signed-in user to edit or delete any of their checks
- [ ] in the background workers perform all the "checks" at the appropiate time.

## Requirements

- node v12.16.1

## Author

- Alejo López [alejolo311](https://github.com/alejolo311) | [@alejolo311](https://twitter.com/alejolo311) | [/in/alejolo311](https://www.linkedin.com/in/alejolo311/)
