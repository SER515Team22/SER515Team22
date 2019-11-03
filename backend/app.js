const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const web = require('./routes/web');

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
let dev_db_url = 'mongodb+srv://ihaldank:idhantqwe@cluster0-qjx9o.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', web);

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

