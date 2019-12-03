var express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const debug = require("debug")("test-master");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

const name = "Test Masters";

debug("booting %s", name);

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

app.use(
  session({
    secret:
      process.env.SECRET ||
      "secrestkeiqouihlqifnpviqwritjnviwqivbpiub40984hdnndj3i02n2n000",
    resave: false,
    saveUninitialized: false
  })
);

require("./routes/card.routes.js")(app);
require("./routes/cardset.routes.js")(app);
require("./routes/course.routes.js")(app);
require("./services/routes.js")(app);
require("./users/routes.js")(app);

app.use(express.static(path.join(__dirname, "build"))); //here is important thing - no static directory, because all static :)

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

var server_port = process.env.PORT || 4000;

app.listen(server_port, () => {
  console.log("Server listening on ", server_port);
});
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
