const Schema = mongoose.Schema;

let AssignmentSchema = new Schema({
    uername: {type:String, required: true},
    std: {type: String, required: true},
    qsn: [String],
    ans: [String],
},
    {timestamps: true}
);

module.exports = mongoose.model('Assignment', AssignmentSchema);