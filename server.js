const express = require("express"):
const path = require ("path");
const fs = require("fs");
const util = require ("util");

//asynchronous process
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Server set up
const app = express();
const PORT = process.env.port || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("./develop/public"));

//get request