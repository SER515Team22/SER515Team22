const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssignmentSchema = new Schema({
    username: {type:String, required: true},
    assnumber: String,
    std: {type: String, required: true},
    qsn: [String]
},
    {timestamps: true}
);

module.exports = mongoose.model('Assignment', AssignmentSchema);