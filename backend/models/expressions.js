const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ExpressionSchema = new Schema({
    id: {type: Number, default: 0},
    expression: {type: String, required: true},
    user_id: {type: Number, required: true},
    valid: {type: Number, required: true}
});

module.exports = mongoose.model('Expression', ExpressionSchema);