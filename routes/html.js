const path = require("path");
const express = require('express')
const router = express()
//const router = require("express").router();
// bo to home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname`../../public/index.html`));
});
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname`../../public/notes.html`));
});
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, `../../public/index.html`));
});

module.exports = router;
