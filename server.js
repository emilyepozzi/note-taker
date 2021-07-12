const mySQL = require("mysql");
const express = require("express");
var app = express();
var PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());