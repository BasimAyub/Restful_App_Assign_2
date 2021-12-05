var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var assignmentSchema = new Schema({
	no: {
		type: String,
		required: true,
	},
	subjectName: {
		type: String,
		required: false,
	},
	questions: {
		type: [String],
	},
	answers: {
		type: [Number],
	},
	totalMarks: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Assignment", assignmentSchema);
