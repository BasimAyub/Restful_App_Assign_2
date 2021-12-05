var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var classSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	teacher: {
		type: mongoose.Types.ObjectId,
		ref: "Teacher",
	},
	classStudents: {
		type: [
			{
				stuid: {
					type: mongoose.Types.ObjectId,
					ref: "Student",
				},
			},
		],
	},
	classQuiz: {
		type: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Quiz",
			},
		],
	},
	classAssignment: {
		type: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Assignment",
			},
		],
	},
	classMaterial: {
		type: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Material",
			},
		],
	},
});

module.exports = mongoose.model("Class", classSchema);
