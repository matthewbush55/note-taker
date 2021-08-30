// bring in required files
const express = require("express");

// Import modular routers for //notes
const notesRouter = require("./notes");

// initialize express for this file
const app = express();

// direct files with the path /api/notes to the .notes router
app.use("/notes", notesRouter);

module.exports = app;
