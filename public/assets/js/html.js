const path = require("path");
const router = require("espress").router();
// bo to home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../publicindex.html"));
});
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public\notes.html"));
});
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
