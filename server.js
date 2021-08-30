// bring in required modules
const express = require("express");
const path = require("path");
const api = require("./routes/index.js");
const notes = require("./routes/notes.js");
// initialize express and port
const app = express();
const PORT = process.env.PORT || 3001;

// ßstandard middleware handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

// set public dir for default routing
app.use(express.static("public"));

// retrieve home page and starting notes page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// start server listening on port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
