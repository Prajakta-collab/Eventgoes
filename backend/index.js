const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
require("dotenv").config();
connectToMongo();
const app = express();
const port = 5000;

app.use(cors());

//middleware for app to use json
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.listen(port, () => {
  console.log(`Eventgo Backend listening at http://localhost:${port}`);
});
