//  Authors:
//  1. Idhant Haldankar

const Solutions = require('../models/solutions');


// Set up mongoose connection
const mongoose = require('../DB/db');

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