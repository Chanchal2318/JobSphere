const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: {
            type: String
        },
        skills: [{ type: String }],
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Corrected Typo
         profilePhoto:{
           type:String,
            default:""
        }
    }
}, { timestamps: true });

// Corrected the export statement
module.exports = mongoose.model('User', userSchema);
