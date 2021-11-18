var classM = require("../Models/class");
var quizM = require("../Models/quiz");
var assignmentM = require("../Models/assignment");
var materialM = require("../Models/material");
var studentM = require("../Models/student");

/* GET Operations */
module.exports.head_Controller = function (req, res, next) {
	res.send("respond with a resource");
};

module.exports.ClassController = function (req, res, next) {
	classM
		.find({})
		.populate("teachers")
		.populate("student.sid")
		.exec(function (error, results) {
			if (error) {
				return next(error);
			}
			// Respond with valid data
			res.json(results);
		});
};

module.exports.MaterialController = function (req, res, next) {
	materialM.find().exec(function (error, results) {
		if (error) {
			return next(error);
		}
		// Respond with valid data
		res.json(results);
	});
};

module.exports.result_Controller = function (req, res, next) {
	studentM
		.find({ _id: req.params.sid })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				quizM.find({ _id: record.quiz._id }, function (error, results) {
					if (error) {
						return next(error);
					}
				});
			});
			res.json(records);
		});
};

module.exports.classs_Result_Controller = function (req, res, next) {
	classM
		.find({ _id: req.params.id })
		.lean()
		.exec(function (error, records) {
			if (error) {
				return next(error);
			}
			records.forEach(function (record) {
				for (var i = 0; i < record.students.length; i++) {
					console.log("Checking for student " + record.students[i]._id);
					studentM.find(
						{ _id: record.students[i]._id },
						function (error, results) {
							if (error) {
								return next(error);
							}
							quizM.find(
								{
									_id: results.quiz._id,
									studentAnswers: { $exists: true, $not: { $size: 0 } },
								},
								function (error, results) {
									if (error) {
										return next(error);
									}
									res.json(results);
								}
							);
						}
					);
				}
			});
		});
};
