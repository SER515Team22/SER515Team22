// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
// let dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';
let dev_db_url = 'mongodb+srv://ihaldank:idhantqwe@cluster0-qjx9o.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB, {useUnifiedTopology: true});
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// I have added this as template to start all backend routes...

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const web = require('./routes/web'); // Imports routes for the products

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', web);

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

