// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", function (req, res) {
  let date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// your first API endpoint...
app.get("/api/:date_string", function (req, res) {
  let date;

  if (/^[0-9]+$/.test(req.params.date_string)) {
    date = new Date(Number(req.params.date_string));
  } else {
    date = new Date(req.params.date_string);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  console.log(typeof req.params.date_string);
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
