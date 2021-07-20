const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static('public'));

// This sets up data parsing-- Express will interpret it/format data as JSON.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// On page load, it should start with index.html. First get it and then listen.


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Notes html and it's "url"
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// GET, POST, DELETE API Endpoints.


app.route("/api/notes")
 

    .get(function (req, res) {
        res.json(database);
    })

    // Add a new note to the json db file.
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;

        // This allows the test note to be the original note.
        let highestId = 99;
        // This loops through the array and finds the highest ID.
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {

                
                highestId = individualNote.id;
            }
        }
    
                newNote.id = highestId + 1;
  
        
        database.push(newNote)

        // Write the db.json file again.
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
        // Gives back the response, which is the user's new note. 
        res.json(newNote);
    });


    

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");

    
    for (let i = 0; i < database.length; i++) {

        if (database[i].id == req.params.id) {

            
            database.splice(i, 1);
            break;
        }
    }


    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(database);
});


// This sets up the server.

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});