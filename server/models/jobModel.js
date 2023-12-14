const mongoose = require('mongoose');

const JobListing = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
    },
    logoUrl: {
      type: String,
    },
    jobPostion: {
      type: String,
      required: [true, 'JobPostion is required'],
    },
    monthlySalary: {
      type: String,
      required: [true, 'MonthlySalary is required'],
    },
    jobType: {
      type: String,
      required: [true, 'JobType is required'],
    },
    remoteOrOffice: {
      type: String,
      required: [true, 'RemoteOrOffice is required'],
    },
    location: {
      type: String,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: [String],
      required: [true, 'skillsRequried is required'],
    },
    information: {
      type: String,
      required: [true, 'Info is required'],
    },
  },
  { timestamps: true }
);

const jobModel = new mongoose.model('job', JobListing);
module.exports = jobModel;
