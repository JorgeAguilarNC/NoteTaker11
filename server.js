// load express
var express = require("express");

// set port
var PORT = process.env.PORT || 3001;

// set express instance to variable
var app = express();

// load routes
var apiRoutes = require(`./routes/apiRouts`);
var htmlRoutes = require(`./routes/html`);
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public/assets"));

app.use(`/api`, apiRoutes);
app.use(`/`, htmlRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
