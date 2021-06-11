// server.js
// where your node app starts

// init project
const express = require("express");
const strftime = require("strftime");
require("dotenv").config();
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get(["/api/:time?", "/api?"], (req, res) => {
  const dateString = req.params.time;

  if (!dateString) {
    const date = new Date();
    const d = {
      unix: date.valueOf(),
      utc: date.toUTCString(),
    };
    return res.json(d);
  } else if (/^\d{5,}/.test(req.params.time)) {
    const dateNum = parseInt(req.params.time);
    return res.json({
      unix: dateNum,
      utc: new Date(dateNum).toUTCString(),
    });
  } else {
    const date = new Date(req.params.time);
    if (date.toString() == "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } else {
      return res.json({
        unix: date.valueOf(),
        utc: date.toUTCString(),
      });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
