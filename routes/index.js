const notes = require("./notes");

//start with '/api'
app.use("/notes", notes);

// /api/team
app.use("/team");
