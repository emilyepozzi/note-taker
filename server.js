const mySQL = require("mysql");
const express = require("express");

const fs = require("fs");
const path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(dirname, "./Develop/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});