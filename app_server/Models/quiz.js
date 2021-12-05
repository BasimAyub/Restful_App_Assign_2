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
	totalMarks: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Quiz", quizSchema);
