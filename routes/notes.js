// bring in required packages
const notes = require("express").Router();
const util = require("util");
const fs = require("fs");

// create a promise object to handle file reads
const readFromFile = util.promisify(fs.readFile);

// used to create a new id for each individual note
const uuid = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

// read all notes and write new notes to the database
const readAndAppend = (content, filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(filePath, parsedData);
    }
  });
};

// read notes, convert them to an object, and delete the note based on the id associated with the selected object to delete
const readAndDelete = (content, filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const deleteIndex = parsedData.findIndex((i) => i.id === content);
      parsedData.splice(deleteIndex, 1);
      writeToFile(filePath, parsedData);
    }
  });
};

// used to convert object to JSON and write to the database
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// GET request
notes.get("", (req, res) => {
  console.log(`${req.method} request received for /api/notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST request
notes.post("", (req, res) => {
  console.log(`${req.method} request received for /api/notes`);
  // deconstruct the request body object and store title & text properties in variables
  const { title, text } = req.body;

  // check to see if BOTH a title and text were input, return an error message
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    // call function to add note to list
    readAndAppend(newNote, "./db/db.json");
    // define an object with the values of the new note
    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

// DELETE request
notes.delete("/*", (req, res) => {
  console.log(req.params[0]);
  console.log(`${req.method} request received for /api/notes`);
  const deletedNote = req.params[0];
  readAndDelete(deletedNote, "./db/db.json");
  res.json("Delete success");
});

module.exports = notes;
