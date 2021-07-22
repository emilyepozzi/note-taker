const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3000;

// This sets up data parsing-- Express will interpret it/format data as JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Notes html 
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



// get, post and delete
app.route("/api/notes")
 
    .get(function (req, res) {
        fs.readFile("./db/db.json", (error, data) => {
            if (error) console.error(error);
            console.log(data);
            res.json(data)
        })
        // res.json(database);
    })

// adding new note to json
    .post(function (req, res) {
        let jsonFiles = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        let hiId = 120;

        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];
            if (individualNote.id > hiId) {
                hiId = individualNote.id;
            }
        }
                newNote.id = hiId + 1;
  
        
        database.push(newNote)

    //db json file
        fs.writeFile(jsonFiles, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });


        res.json(newNote);
    });


app.delete("/api/notes/:id", function (req, res) {
    let jsonFiles = path.join(__dirname, "/db/db.json");

    for (let i = 0; i < database.length; i++) {

        if (database[i].id == req.params.id) {

            
            database.splice(i, 1);
            break;
        }
    }


    fs.writeFileSync(jsonFiles, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(database);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});