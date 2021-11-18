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
	students: {
		type: [
			{
				stuid: {
					type: mongoose.Types.ObjectId,
					ref: "Student",
				},
			},
		],
	},
	subjects: {
		type: [
			{
				subid: {
					type: mongoose.Types.ObjectId,
					ref: "Subject",
				},
			},
		],
	},
});

module.exports = mongoose.model("Class", classSchema);
