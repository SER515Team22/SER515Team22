const Expression = require('../models/expressions');
const calc = require('mathjs');

exports.root = (req, res) => {
    res.send('Reached Base');
}

exports.evaluate = (req, res) => {
    let expression = new Expression(
        {
            expression: req.body.exp,
            user_id: req.body.u_id,
            valid: req.body.valid
        }
    );

    expression.save(function (err) {
        if (err) {
            return next(err);
        }

        let data = {"soln": "", "status": "Success"};
        let x = calc.evaluate((req.body.exp)).toString();
        data['soln'] = x;
        res.send(data);
    })




    
}