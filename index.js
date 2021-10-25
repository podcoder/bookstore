/**
 * express function in order to create a new instance of Express Application
 */
const express = require("express");

/** invoke the function to create the app */
const app = express();
const port = 3000;

app.get("/", (/* (request, response, next)*/ req, res) => {
  res.send("<h1>Hello World!\n</h1>");
});

app.listen(port, () => {
  console.log("Application is running on Port" + port);
});
