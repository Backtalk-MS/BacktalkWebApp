const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const models = require("./routes/api/models");

const app = express();

//Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //Shallow parse

//Database uri
const databaseURI = require("./configuration/keys").databaseURI;

//Validate database connection with successful
mongoose
  .connect(
    databaseURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Database connection was established successfully"))
  .catch(err =>
    console.log(`DATABASE CONNECTION COULD NOT BE ESTABLISH: ${err}`)
  );

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./configuration/passport")(passport);

//Define used routes
app.use("/api/users", users);
app.use("/api/models", models);

//Backend Server port
const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
