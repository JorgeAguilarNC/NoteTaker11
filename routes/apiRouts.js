// load express and router
var router = require(`express`).Router();
// load file system for read/write functions
var fs = require(`fs`);
// link db.json for saved notes
var db = require(`../db/db.json`);
console.log(db)
// load uuid for unique IDs
var { v4: uuidv4 } = require(`uuid`);
var { resolve } = require("path");

// get existing notes
router.get(`/notes`, (req, res) => {
  console.log(db, 'in get')
  // read db.json to get the saved notes
  return readFile(
    new Promise((resolve, reject) => {
      fs.readFile('db/db.json', "utf8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(
         JSON.parse(data),
        );
      });
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.error(err))
  );
});

// add a note
router.post(`/notes`, (req, res) => {
  console.log('in post')
  // receive new note from request body
  let newNote = req.body;
  // add unique ID to new note
  console.log (newNote);
  newNote.id = uuidv4();
  // add new note to saved notes
  let getnotes = db;
  getnotes.push(newNote);
  // push new saved notes array to db.json
  getnotes = JSON.stringify(getnotes);
  console.log (getnotes);
  fs.writeFile('db/db.json', getnotes, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("added new note to db.json");
      // return new note to client
      res.json(newNote);
    }
  });
});

// delete a note
router.delete('/notes/:id', async(req,res) => {
  console.log('in delete')
  // receive query param of id
  var deleteID = req.params.id;
  console.log('id', deleteID)

  // read db.json to get saved notes array
  return (
    new Promise((resolve, reject) => {
      fs.writeFile('db/db.json', "utf8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }


        // parse db.json into getnotes array
        var getnotes = JSON.parse(data);
        // filter out note with delete id and save as newSavedNotes array
        let newSavedNotes = getnotes.filter((note) => note.id != deleteID);

        // get title of deleted note
        var deletedNote = getnotes.filter((note) => note.id == deleteID);
        var deletedTitle = deletedNote[0].title;

        resolve({
          ok: true,
          deletedTitle: deletedTitle,
          newSavedNotes: newSavedNotes,
        });
      });
    })
      // write new db.json file without deleted note
      .then((response) => {
        if (response.ok) {
          fs.writeFile(
            'db/db.json',
            JSON.stringify(response.newSavedNotes),
            (err) => {
              if (err) {
                console.error(err);
              }

              console.log(`note '${response.deletedTitle}' deleted`);
            }
          );

          // creat object to hold notes array
          let newNotesObj = {
            notes: response.newSavedNotes,
          };

          return newNotesObj;
        }
      })
      .then((newNotesObj) => {
        res.json(newNotesObj);
      })
      .catch((err) => console.error(err))
  );
});

module.exports = router;
