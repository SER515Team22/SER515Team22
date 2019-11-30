//Authors
//1. Idhant Haldankar
//2. Gaytahri Sitaraman


const Users = require('../models/user');

// Set up mongoose connection
const mongoose = require('../DB/db');

exports.register = (req, res) => {
    let user = new Users(
        {
          type: req.body.type,
          username: req.body.username,
          email: req.body.email,
          hash: req.body.password,
          standard: req.body.standard
        }
        
    );
    user.setPassword(req.body.password);
    user.save((err) => {
      if (err){
        res.send({"status": "Not registered"});
      }
      res.send({"status": "Registered"});
    })
}

exports.login = (req, res) => {
  var salt;
  let pass2;
  let user = new Users();
  var users = mongoose.model('User');
  users.findOne({username: req.body.username}, (err, data) => {
    if(err){
      console.log(err);
      return err;
    }
    salt = data.salt;
    pass2 = data.hash;
    if (user.creatAndCompare(req.body.password, pass2, salt))
      res.send(user.toAuthJSON(data));
  });
}
