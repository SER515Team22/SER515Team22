// I have added this as template to start all backend routes...

var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.post("/save", (req, res, next) => {
    res.json();
   });

app.put('', );

app.delete('', );