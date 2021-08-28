// bring in required files
const express = require("express");

// Import our modular routers for //notes
const notesRouter = require("./notes");

// initialize express for this file
const app = express();
//start with '/api'
app.use("/notes", notesRouter);

module.exports = app;
