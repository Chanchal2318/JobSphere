const express = require("express");
const router = express.Router();
const {postJob , getAllJobs , getAdminJobs , getJobById } =  require('../controllers/job.controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
console.log(isAuthenticated);

router.post("/post",isAuthenticated,postJob);
router.get("/get",isAuthenticated,getAllJobs);
router.get("/getadminjobs",isAuthenticated,getAdminJobs);
router.get("/get/:id",getJobById);

module.exports = router;