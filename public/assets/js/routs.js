// load express and router
const router = require("express").Router();
// load file system for read/write functions
const fs = require("fs");
// link db.json for saved notes
const db = require("./../dbdb.json");
// load uuid for unique IDs
const { v4: uuidv4 } = require("uuid");

// get existing notes
router.get("/notes", (req, res) => {
  // read db.json to get the saved notes
  res.json(db);
});

// add a note
router.post("/notes", (req, res) => {
  // receive new note from request body
  let newNote = req.body;
  // add unique ID to new note
  newNote.id = uuidv4();
  // add new note to saved notes
  let savedNotes = db;
  savedNotes.push(newNote);
  // push new saved notes array to db.json
  savedNotes = JSON.stringify(savedNotes);
  fs.writeFile("db/db.json", savedNotes, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("added new note to db.json");
      // return new note to client
      res.json(newNote);
    }
  });
});
