var exp = require('express');
var app = exp();
const mathobj = require('mathjs');

app.use(require('body-parser').json());
const MongoClient = require('mongodb').MongoClient ;

MongoClient.connect('mongodb+srv://minion:hello@cluster0-tup9u.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true },(err,client) => {
	if (err) return console.log(err);
	db = client.db('Funmath');
	app.listen(2000,function () {
        console.log("Listening on 2000");
	})
})


app.get('/Expressions',function(req,res) {
	var resul = [];
	db.collection('Expressions').find().toArray(function(err,results) {
		resul = results;
		console.log(resul);
		res.json(resul);
	})
})

//To get the last 5 records

app.get('/Expressions/lastn',function(req,res) {
	var numRecords=5;
	var resul = [];
	var restresult = "";
        db.collection('Expressions').find().sort({_id:-1}).limit(numRecords).toArray(function(err,results) {
        console.log(results);
	//res.json(toArray(resul));
        for(expr in results) {
		//var expr = resul[indx];
		console.log(results[expr]);
		if (results[expr].result) {
			restresult = results[expr].expression + "=" + results[expr].result;
		} else {
			restresult = results[expr].expression + ":  Error: " + results[expr].Error;
			//res.send(restresult);
		}
		resul[expr] = restresult;
	}
	for(i in resul) {
		console.log(resul[i]);
	}
	res.send(resul);
	})
	//res.send(resul);
})

//Store the expressions done 
app.post('/Expressions',function(req,res) {
	expr = (req.body.expression);
	console.log(expr)
	er = "";
	error = "";
        try {
		var val = mathobj.evaluate(req.body.expression).toString();
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
	db.collection('Expressions').insertOne({"expression":expr,"result":val,"Error":error,"Timestamp":new Date()}, (err,result) => {
	if (error) console.log(error)
	console.log("saved to db");
        res.send(error);
	})
})

