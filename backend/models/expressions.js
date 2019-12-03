//  Authors:
//  1. Idhant Haldankar

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExpressionSchema = new Schema({
    id: {type: Number, default: 0},
    expression: {type: String, required: true},
    user_id: {type: Number, required: true},
    valid: {type: Number, required: false},
    timestamp: {type: String, required: false},
    errormsg: {type: String, required: false},
    result: {type: Number, required: false}
});

module.exports = mongoose.model('Expression', ExpressionSchema);
