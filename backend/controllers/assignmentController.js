//  Authors:
//  1. Gayathri Sitaraman
//  2. Idhant Haldankar

const Assignments = require('../models/assignments');
const Solutions = require('../models/solutions');
const mongoose = require('../DB/db');

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

exports.viewass = (req, res) => {
    let assignments = mongoose.model('Assignment');
    assignments.find({std: req.query.standard}, (err, data) => {
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

exports.viewsubmissions = (req, res) => {
    let assignments = mongoose.model('Solution');
    assignments.find({std: req.query.standard, 
                      assnumber: req.query.assnumber}, (err, data) => {
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
