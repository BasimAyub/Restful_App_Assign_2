var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var studentSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	rollno: {
		type: String,
		required: true,
	},
	quiz: {
		type: mongoose.Types.ObjectId,
		ref: "Quiz",
	},
	assignment: {
		type: mongoose.Types.ObjectId,
		ref: "Assignment",
	},
	material: {
		type: mongoose.Types.ObjectId,
		ref: "Material",
	},
});

module.exports = mongoose.model("Student", studentSchema);
