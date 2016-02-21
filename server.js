var express = require("express");

var app = express();
app.use(express.static("static"));
var port = 1337;

app.listen(port);

console.log("Listening on port " + port + "...");
