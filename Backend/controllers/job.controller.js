const Job = require('../models/job.model');

// Post a new job
const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Check for missing fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Create a new job entry
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","), // Split requirements by comma
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (err) {
        console.error(err); // Improved error logging
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get all jobs with optional keyword search
const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        // Find all jobs and populate company field (Ensure the schema uses "company")
        const jobs = await Job.find(query)
            .populate({
                path: "company"
            })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (err) {
        console.error(err); // Improved error logging
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get a specific job by its ID
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (err) {
        console.error(err); // Improved error logging
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get all jobs created by the admin (using admin's ID)
const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (err) {
        console.error(err); // Improved error logging
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    getAdminJobs,
    getAllJobs,
    postJob,
    getJobById
};
