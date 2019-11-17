const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var config = require('../config');

// var uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new Schema({
    type: {type: String, required: true},
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    hash: String,
    salt: String,
    standard: String
},
{timestamps: true});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.creatAndCompare = (password1, password2, salt) => {
  // salt = new Buffer(salt, 'binary');
  hash = crypto.pbkdf2Sync(password1, salt, 10000, 512, 'sha512').toString('hex');
  if (hash === password2)
    return true;
  return false;
}

UserSchema.methods.validPassword = function(password) {
  // console.log(UserSchema.findOne({username: "idhant96"}));
 var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
 return this.hash === hash;
};

UserSchema.methods.generateJWT = function(user) {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: user.id,
    username: user.username,
    exp: parseInt(exp.getTime() / 1000),
  }, config.secret);
};

UserSchema.methods.toAuthJSON = function(user){
    return {
      username: user.username,
      email: user.email,
      token: this.generateJWT(user),
      standard: user.standard,
      type: user.type
    };
  };


// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('User', UserSchema);
