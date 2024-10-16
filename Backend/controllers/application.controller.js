// const { Application } = require("../models/application.model");
// const Job = require("../models/job.model");


// const applyJob = async(req,res)=>{
//     try{
//        const userId = req.id;
//        const jobId= req.params.id;
//        if(!jobId){
//         return res.status(400).json({
//             message:"Job Id is required",
//             success:false
//         })
//        };
//     //    check if user already applied for the job
//     const existingApplication = await Application.findOne({job:jobId, applicant : userId});
//     if(existingApplication){
//         return res.status(400).json({
//             message:"You have already applied for job",
//             success:false
//         });
//     };
//     // check if the job doesn't exist
//     const job = await Job.findById(jobId);
//     if(!job){
//         return res.status(404).json({
//             message:"Job not found",
//             success:false
//         });
//     }
//     // create a new application
//     const newApplication = await Application.create({
//         job:jobId,
//         applicant:userId,
//     });
//     job.applications.push(newApplication._id);
//     await job.save();
//     return res.status(201).json({
//         message:"Job applid successfully",
//         success:true
//     })
// }
//     catch(err){
//         console.log(err);
//     }
// }

// const getAppliedJob = async(req,res)=>{
//     try{
//         const userId = req.id;
//         const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
//           path:'job',
//           options:{sort:{createdAt:-1}},
//           populate:{
//             path:'company',
//             options:{sort:{createdAt : -1}}
//           }
//         });
//         if(!application){
//             return res.status(404).json({
//                 message:"No Application",
//                 success:false
//             });
//         };
//         return res.status(200).json({
//             application,
//             success:true
//         })
//     }
//     catch(err){
//         console.log(err);
//     }
// }


// // Here, admin checks that how many user applied on it
// const getApplicants = async(req,res)=>{
//     try{
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//           path:'applications',
//           options:{sort:{createdAt : -1}},
//           populate:{
//             path:'applicant',
//             options:{sort:{createdAt:-1}}
//           }
//         });
//         if(!job){
//             return res.status(400).json({
//                 message:"Job Not found",
//                 success:false
//             })
//         };
//         return res.status({
//             job,
//             success:true
//         });
//     }
//     catch(err){
//         console.log(err);
//     }
// }



// const updateStatus = async(req,res)=>{
//     try{
//         const {status} = req.body;
//         const applicationId = req.params.id;
//         if(!status){
//             return res.status(404).json({
//                 message:'Status is required',
//                 success:false
//             });
//         };
//         // find the application by ApplicantId
//         const application = await Application.findOne({_id:applicationId});
//         if(!application){
//             return res.status(404).json({
//                 message:'Application not found',
//                 success:false
//             }); 
//         };
//         // update the status
//         application.status = status.toLowerCase();
//         await application.save();

//         return res.status(200).json({
//             message:"Status updated successfully",
//             success:true
//         })
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// module.exports = {
//     getAppliedJob,
//     applyJob,
//     updateStatus,
//     getApplicants,

// }



const Application = require("../models/application.model"); // Correct import for Application model
const Job = require("../models/job.model");

// Function to apply for a job
const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job Id is required",
        success: false,
      });
    }

    // Check if the user already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for the job",
        success: false,
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Function to get all jobs the user applied for
const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Function to get applicants for a specific job (Admin functionality)
const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Function to update application status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // Find the application by ID
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // Update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  getAppliedJob,
  applyJob,
  updateStatus,
  getApplicants,
};
