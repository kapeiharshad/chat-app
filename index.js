const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const fs = require("fs");

mongoose.connect(
  "mongodb://127.0.0.1:27017/chat-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Mongodb Connected");
  }
);
mongoose.set("useCreateIndex", true);

app.use(bodyParser.json());

const controllerFiles = fs.readdirSync("./controller/");

controllerFiles.forEach((controllerFile) => {
  let controller = require(`./controller/${controllerFile}`);
  app.use(`/${controllerFile}`, controller);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
