var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var materialSchema = new Schema({
	lectureNo: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	descriptipn: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("Material", materialSchema);
