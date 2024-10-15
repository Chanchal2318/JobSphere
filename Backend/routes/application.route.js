const express = require("express");
const router = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthenticated');
console.log(isAuthenticated);
const {applyJob, getAppliedJob,updateStatus,getApplicants} = require("../controllers/application.controller");

router.get("/apply/:id",isAuthenticated,applyJob);
router.get("/get",isAuthenticated,getAppliedJob);
router.get("/:id/applicants",isAuthenticated,getApplicants);
router.post("/status/:id/update",isAuthenticated,updateStatus);



module.exports = router;