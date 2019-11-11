const Assignments = require('../models/assignments');

exports.postass = (req, res) => {
    // todo validate if user is faculty
    let assignments = new Assignments(
        {
            username: req.body.username,
            assnumber: req.body.assnumber,
            std: req.body.standard,
            qsn: req.body.questions,
            ans: req.body.answers,
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
    let assignments = new Assignments(
        {
            username: req.body.username,
            assnumber: req.body.assnumber,
            std: req.body.standard,
            qsn: req.body.questions,
            ans: req.body.answers,
        }
    );

    assignments.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({"status": "Success"});
    })  
}



// exports.getass = (req, res) => {
//     let assignments = new Assignments(
//         {
//             username: req.body.username,
//             std: req.body.standard,
//             qsn: req.body.questions,
//             ans: req.body.answers,
//         }
//     );

//     assignments.save(function (err) {
//         if (err) {
//             return next(err);
//         }
//         res.send("status": "Success");
//     })  
// }

