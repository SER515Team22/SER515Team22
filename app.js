// I have added this as template to start all backend routes...

var express = require("express");
var app = express();
const calc = require('mathjs');

app.use(express.json()) 

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get('/', (req,res, next) => {
    res.send('reached root');
})
app.post("/evaluate", (req, res, next) => {
    var data = {"response": ""}
    let x = calc.evaluate((req.body.exp)).toString();
    data['response'] = x;
    res.send(data);
   });
