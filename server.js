// bring in required modules
const express = require("express");
const apiRoute = require("./routes");
// initialize express and port
const app = express();
const PORT = process.env.PORT || 3001;

// standard middleware handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoute);

// set public dir for default routing
app.use(express.static("public"));

// start server listening on port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
