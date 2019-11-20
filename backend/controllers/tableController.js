// const mongoose = require('mongoose');
const Solutions = require('../models/solutions');


// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
let dev_db_url = 'mongodb+srv://ihaldank:idhantqwe@cluster0-qjx9o.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.truncate = (req, res) => {
    let table = req.query.table;
    const tables = ['Solution', 'Assignment', 'Expression', 'User'];
    let current_model = null;
    for (var i=0;i<tables.length;i++){
        if (tables[i] === table){
            current_model = mongoose.model(table);
            break;
        }
    }
    if (current_model){
        current_model.deleteMany({}, (err) => {
            if (err){
                res.send('Failed');
            }
            res.send("Success");
        });
    }
    else{
        res.send('invalid table/model selected');
    }

}