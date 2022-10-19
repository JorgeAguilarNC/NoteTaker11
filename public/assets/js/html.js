const path = require("path");
const router = require("exspress").router();
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
