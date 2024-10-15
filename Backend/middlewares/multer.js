// const multer = require("multer") ;

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");

// const multer = require('multer'); // Use require instead of import

// const storage = multer.memoryStorage();
// const singleUpload = multer({ storage }).single("file");

// module.exports = { singleUpload }; // Use module.exports

// const multer = require("multer") ;

// const upload = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");

// const multer = require('multer'); // Use require instead of import

// const storage = multer.memoryStorage();
// const singleUpload = multer({ storage }).single("file");

// module.exports = { singleUpload }; // Use module.exports




// CommonJS syntax: Use require
const multer = require("multer");

// Define the storage (using memoryStorage as an example)
const storage = multer.memoryStorage();

// Define the singleUpload function
const singleUpload = multer({ storage }).single("file");

// Export the singleUpload function using module.exports
module.exports = { singleUpload };
