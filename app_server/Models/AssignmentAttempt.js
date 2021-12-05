var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var assignmentAttemptSchema = new Schema({
	class: {
		type: mongoose.Types.ObjectId,
		ref: "Class",
	},
	student: {
		type: mongoose.Types.ObjectId,
		ref: "Student",
	},
	assignment: {
		type: mongoose.Types.ObjectId,
		ref: "Assignment",
	},
	answers: {
		type: [Number],
	},
	marks: {
		type: Number,
	},
});

module.exports = mongoose.model("AssignmentAttempt", assignmentAttemptSchema);
