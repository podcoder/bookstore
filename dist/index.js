"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
/**
 * express function in order to create a new instance of Express Application
 */
/** invoke the function to create the app */
const app = (0, express_1.default)();
/**
 *
 */
require("dotenv").config();
const port = process.env.PORT;
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (/* (request, response, next)*/ req, res) => {
    res.render("index");
});
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`App is running on port: ${port}`);
});
//# sourceMappingURL=index.js.map