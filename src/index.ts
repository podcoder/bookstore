import express from "express";
import path  from "path";
/**
 * express function in order to create a new instance of Express Application
 */
/** invoke the function to create the app */
const app = express();
/**
 *
 */
require("dotenv").config();

const port = process.env.PORT;

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.get("/", (/* (request, response, next)*/ req, res) => {
  res.render( "index" );
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App is running on port: ${port}`)
});
