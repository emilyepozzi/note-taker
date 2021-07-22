const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3000;

// setting up data parsing
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//notes for html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



// post, get and delete
app.route("/api/notes")
 
.get(function (req, res) {
    console.log("testing")
    fs.readFile("./db/db.json", 'utf8', (error, data) => {

        if (error) console.error(error);
        console.log(JSON.parse(data));
        res.json(JSON.parse(data))
    })
 
})

//adding info in json
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

        fs.writeFile(jsonFiles, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });


        res.json(newNote);
    });

// app.delete("/api/notes/:id", function (req, res) {
//     let jsonFiles = path.join(__dirname, "/db/db.json");


//     for (let i = 0; i < database.length; i++) {


//         if (database[i].id == req.params.id) {


//             database.splice(i, 1);
//             break;
//         }
//     }

//     fs.writeFileSync(jsonFiles, JSON.stringify(database), function (err) {

//         if (err) {
//             return console.log(err);
//         } else {
//             console.log("Your note was deleted!");
//         }
//     });
//     res.json(database);
// });


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});