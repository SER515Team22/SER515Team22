const Expression = require('../models/expressions');
const mathobj = require('mathjs');

exports.root = (req, res) => {
    res.send('Reached Base');
}

exports.evaluate = (req, res) => {

    	
	expr = (req.body.exp);
	console.log(expr)
	var er = "";
	var error = "";
        try {
		var val = mathobj.evaluate(req.body.exp).toString();
		console.log(val)
	}
	catch(err) {
		er = err.toString();
		var err = " ";
		console.log(er);
		if(er.indexOf(" Parenthesis ") != -1) {
			error = "Make sure paranthesis is balanced";
		} else if(er.includes("Value expected") != -1) {
			error = "Number missing after operator";
		}
	}
	if(error == "") {
		valid = 0;
	}
	else {
		valid = 1;
	}
    let expression = new Expression(
        {
            expression: req.body.exp,
            user_id: req.body.u_id,
	    timestamp: req.body.timestamp,
            errormsg: error,
	    result: val,
	    valid: valid
	}
    );

    expression.save(function(err) {
	    if(err){
		    res.send(err);
	    }
	    else {
		    res.send(expression);
	    }
    });
}
    /*expression.save(function (err) {
		var er = "";
                var x = ""
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

    
}*/
