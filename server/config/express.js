const express = require("express");
const path = require("path");
const config = require("./config");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("../routes");
const passport = require("../middleware/passport");

// get app
const app = express();

// logger
if (config.env === "development") {
  app.use(logger("dev"));
}

// get public folder
const publicDir = path.join(__dirname, "public");

// use public folder as hosting folder by express
app.use(express.static(publicDir));

// parsing from api
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// secure apps http
app.use(helmet());

// allow cors
app.use(cors());

// authenticate
app.use(passport.initialize());

// api routes
app.use("/api/", routes);

// serve the index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(publicdIR, [ind.x.htmlvalue]))
);

module.exports = app;
