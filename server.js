var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var reservations = [];
var waitlist = [];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.post("/api/tables", function(req, res) {
  console.log(req.body);
  var newreserve = req.body;
  newreserve.routeName = newreserve.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newreserve);

  if ( reservations.length < 5 ){
    reservations.push(newreserve);
  } else {
    reservations.push(waitlist);
  }

  res.json(newreserve);
});

app.post("/api/clear", function(req, res) {
  reservations = [];
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});