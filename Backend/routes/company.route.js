const express = require("express");
const router = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const {singleUpload} = require("../middlewares/multer");
console.log(isAuthenticated);

// Import `register` from the controller
const { getCompany, getCompanyById, registerCompany, updateCompany } = require("../controllers/company.controller");
console.log(registerCompany);
console.log(getCompany);
console.log(getCompanyById);
console.log(updateCompany);

// Define routes using the imported controller
router.post("/register", isAuthenticated,registerCompany);
router.get("/get",isAuthenticated,getCompany);
router.get("/get/:id",isAuthenticated,getCompanyById);
router.put("/update/:id",isAuthenticated,singleUpload,updateCompany);

module.exports = router;