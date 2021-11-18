var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var quizSchema = new Schema({
	no: {
		type: String,
		required: true,
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

module.exports = mongoose.model("Quiz", quizSchema);
