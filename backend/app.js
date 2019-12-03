//  Authors:
//  1. Idhant Haldankar

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const web = require('./routes/web');

const mongoose = require('./DB/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', web);

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

