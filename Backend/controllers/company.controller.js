// const Company = require('../models/company.model');

// // Register a new company
// const registerCompany = async (req, res) => {
//     try {
//         const { companyName } = req.body;
//         if (!companyName) {
//             return res.status(400).json({
//                 message: "Company name is required",
//                 success: false
//             });
//         }

//         let company = await Company.findOne({ name: companyName });
//         if (company) {
//             return res.status(400).json({
//                 message: "You can't register the same company",
//                 success: false
//             });
//         }

//         company = await Company.create({
//             name: companyName,
//             userId: req.id
//         });

//         return res.status(201).json({
//             message: "Company registered successfully",
//             company,
//             success: true
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: "An error occurred while registering the company",
//             success: false
//         });
//     }
// };

// // Get companies for a user
// const getCompany = async (req, res) => {
//     try {
//         const userId = req.id; // Logged in userId
//         const companies = await Company.find({ userId });

//         if (companies.length === 0) {
//             return res.status(404).json({
//                 message: "No companies found for this user",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             companies,
//             success: true
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: "An error occurred while fetching companies",
//             success: false
//         });
//     }
// };

// // Get company by ID
// const getCompanyById = async (req, res) => {
//     try {
//         const companyId = req.params.id;
//         const company = await Company.findById(companyId);

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             company,
//             success: true
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: "An error occurred while fetching the company",
//             success: false
//         });
//     }
// };

// // Update company
// const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;

//         // If you're handling a file upload, you would typically process that here.
//         const file = req.file; // Uncomment if using file uploads
        


//         const updateData = { name, description, website, location };
//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Company information updated",
//             company, // Optionally return the updated company object
//             success: true
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: "An error occurred while updating the company",
//             success: false
//         });
//     }
// };

// module.exports = {
//     getCompany,
//     registerCompany,
//     getCompanyById,
//     updateCompany
// };







const Company = require('../models/company.model');
const { getDataUri } = require("../utils/datauri");
const { cloudinary } = require("../utils/cloudinary");

// Register a new company
const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get companies by logged-in user
const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (!companies.length) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get company by ID
const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update company details
// const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;
//         const file = req.file;

//         let logo;

//         if (file) {
//             // Process file using getDataUri and Cloudinary
//             const fileUri = getDataUri(file);

//             const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//             logo = cloudResponse.secure_url;
//         }

//         // Prepare update data, including logo if uploaded
//         const updateData = { name, description, website, location };
//         if (logo) {
//             updateData.logo = logo;
//         }

//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Company information updated.",
//             company,
//             success: true
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

const updateCompany = async (req, res) => {
    try {
        // Check if the id is provided in the route params
        const companyId = req.params.id;
        if (!companyId || companyId === 'undefined') {
            return res.status(400).json({
                message: "Company ID is required.",
                success: false
            });
        }

        // Validate if the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid Company ID.",
                success: false
            });
        }

        const { name, description, website, location } = req.body;
        const file = req.file;
        let logo;

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = { name, description, website, location };
        if (logo) {
            updateData.logo = logo;
        }

        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    getCompany,
    registerCompany,
    getCompanyById,
    updateCompany
};
