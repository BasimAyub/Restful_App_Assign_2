var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var quizAttemptSchema = new Schema({
	class: {
		type: mongoose.Types.ObjectId,
		ref: "Class",
	},
	student: {
		type: mongoose.Types.ObjectId,
		ref: "Student",
	},
	quiz: {
		type: mongoose.Types.ObjectId,
		ref: "Quiz",
	},
	answers: {
		type: [Number],
	},
	marks: {
		type: Number,
	},
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
