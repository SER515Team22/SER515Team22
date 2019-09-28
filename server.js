var exp = require('express');
var app = exp();

const MongoClient = require('mongodb').MongoClient ;

MongoClient.connect('mongodb+srv://minion:hello@cluster0-tup9u.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true },(err,client) => {
	if (err) return console.log(err);
	db = client.db('Cluster0');
	app.listen(2000,function () {
        console.log("Listening on 2000");
	})
})


app.get('/',function(req,res) {
	var cur = db.collection('expressions').find();
	console.log(cur);
	res.send("hello");
})

app.post('/expressions',function(req,res) {
	db.collection('expressions').save({"expression":"2+3"}, (err,result) => {
	if (err) return console.log(err)
	console.log("saved to db");
	res.send("Dummy post");
	res.redirect("/");
	})
})





