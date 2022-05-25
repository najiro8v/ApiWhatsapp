require("dotenv").config({ path: "./.env" });
var bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const apiRoutes = require("./app.routes");

const port = 3000;
const app = express();

app.use(cors());
app.listen(port, () => {
  console.log("conectado");
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.initRoutes(app, "/");
