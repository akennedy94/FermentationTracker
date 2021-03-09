const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routeIndex = require('./serverRouting.js');

const PORT = 5000;

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, '../build')))
    .use(express.json())
    .use('/', routeIndex);

app.listen(PORT, () => { 
    console.log("Server running on port: " + PORT)
});

