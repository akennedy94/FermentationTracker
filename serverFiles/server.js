const express = require("express");
const app = express();
const path = require("path");
const routeIndex = require("./serverRouting.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

app
  .use(express.json())
  .use(cookieParser())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, "../build")))
  .use("/", routeIndex);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
