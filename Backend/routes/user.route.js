const express = require("express");
const router = express.Router();

const { isAuthenticated } = require('../middlewares/isAuthenticated');
console.log(isAuthenticated);

// Import `register` from the controller
const { register, updateProfile, login,logout} = require("../controllers/User.controller");
const { singleUpload } = require("../middlewares/multer");
console.log(register);
console.log(login);
console.log(updateProfile);

// Define routes using the imported controller
router.post("/register",singleUpload, register);
router.post("/login",login);
router.post("/profile/update",isAuthenticated,singleUpload,updateProfile);
router.get("/logout",logout);

module.exports = router;
