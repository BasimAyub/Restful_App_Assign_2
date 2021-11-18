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
	studentAnswers: {
		type: [Number],
	},
	totalMarks: {
		type: Number,
		required: true,
	},
	obtainedMarks: {
		type: Number,
		required: false,
	},
});

module.exports = mongoose.model("Assignment", assignmentSchema);
