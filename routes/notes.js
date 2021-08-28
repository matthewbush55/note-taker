const notes = require("express").Router();
const util = require("util");
const fs = require("fs");
const app = require(".");

const readFromFile = util.promisify(fs.readFile);
// used to create a new id for each individual note
const uuid = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
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
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

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
notes.delete("", (req, res) => {
  console.log(req.params[0]);
  console.log(`${req.method} request received for /api/notes`);
  const deletedNote = req.params[0];
  readAndDelete(deletedNote, "./db/db.json");
  res.json("Delete success");
});

module.exports = notes;
