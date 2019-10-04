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
		var x = "";
		var er = "";
		var error = "";
        if (err) { 
            return next(err);
        }

        let data = {"soln": "", "status": "Success"};
		try{
			let x = calc.evaluate((req.body.exp)).toString();
		}
		catch(err) {
			er = err.toString();
			//var err = " ";
			if(er.indexOf(" Parenthesis ") != -1) {
				error = "Make sure paranthesis is balanced";
			} else if(er.includes("Value expected") != -1) {
				error = "Number missing after operator";
				}
		}
		if(error) {
			console.log(error);
			data['soln'] = "error";
			data['status'] = "Failed with Error" + error
			res.send(data);
		}  else {
			data['soln'] = x;
			res.send(data);
		}
    })




    
}