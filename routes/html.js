const path = require("path");
const express = require('express')
const app = express.Router();
//const app = require("express").app();
// bo to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname,'../public/notes.html'));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

module.exports = app;
