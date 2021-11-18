var express = require("express");
var router = express.Router();
var headC = require("../Controller/head");

// GET Operations
router.get("/", headC.head_Controller);
router.get("/class", headC.ClassController);
router.get("/reults/class/:id", headC.classs_Result_Controller);
router.get("/reults/student/:id", headC.result_Controller);
router.get("/materials", headC.MaterialController);
module.exports = router;
