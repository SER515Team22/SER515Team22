//  Authors:
//  1. Gayathri Sitaraman
//  2. Idhant Haldankar

const Assignments = require('../models/assignments');
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


//posting assignment - faculty
exports.postass = (req, res) => {
    // todo validate if user is faculty
    let assignments = new Assignments(
        {
            username: req.body.username,
            assnumber: req.body.assnumber,
            std: req.body.standard,
            qsn: req.body.questions
        }
    );

    assignments.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({"status": "Success"});
    })  
}

//submit assignment - student
exports.submitass = (req, res) => {
    // todo validate if user is student
    let solutions = new Solutions(
        {
            username: req.body.username,
            assnumber: req.body.assnumber,
            std: req.body.standard,
            qsn: req.body.questions,
            ans: req.body.answers,
        }
    );

    solutions.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({"status": "Success"});
    })  
}

//view assignment
exports.viewass = (req, res) => {
    let assignments = mongoose.model('Assignment');
    assignments.find({std: req.body.standard}, (err, data) => {
        if(err){
            // console.log(err);
            res.send({"status": "Fail", "err": "DB error"});
            return err;
          }
        if (data.length != 0){
            res.send({"status":"success", "data": data});
        }
        else{
            res.send({"status": "Fail", "err": "No records"});
        }
    })
}

//view submissions for faculty
exports.viewsubmissions = (req, res) => {
    let assignments = mongoose.model('Solution');
    assignments.find({std: req.body.standard, 
                      assnumber: req.body.assnumber}, (err, data) => {
                          if (err) {
                            res.send({"status": "Fail", "err": "DB error"});
                            return err;
                        }
                      if (data.length != 0){
                        res.send({"status":"success", "data": data});
                    }
                    else{
                        res.send({"status": "Fail", "err": "No records"});
                    }
})
}
