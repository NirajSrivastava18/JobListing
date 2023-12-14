const Job = require('../models/jobModel');

const addJob = async (req, res, next) => {
  try {
    const {
      companyName,
      logoUrl,
      jobPostion,
      monthlySalary,
      jobType,
      remoteOrOffice,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    } = req.body;
    if (
      !companyName ||
      !logoUrl ||
      !jobPostion ||
      !monthlySalary ||
      !jobType ||
      !remoteOrOffice ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !information
    ) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide all required fields',
      });
    } else {
      const updatedLocation = location === '' ? 'Remote' : location;

      const updatedlogoUrl = req.body.logoUrl
        ? req.body.logoUrl
        : 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250';

      const newJobListing = new Job({
        companyName,
        logoUrl: updatedlogoUrl,
        jobPostion,
        monthlySalary,
        jobType,
        remoteOrOffice,
        location: updatedLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
        information,
      });

      await newJobListing.save();
      res.status(201).json({
        status: 'Success',
        message: 'Job Listing created successfully',
      });
    }
  } catch (err) {
    res.status(500).json({ status: 'Failed', message: err });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log(jobId);
    const {
      companyName,
      logoUrl,
      jobPostion,
      monthlySalary,
      jobType,
      remoteOrOffice,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    } = req.body;
    if (
      !companyName ||
      !logoUrl ||
      !jobPostion ||
      !monthlySalary ||
      !jobType ||
      !remoteOrOffice ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !information
    ) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide all required fields',
      });
    } else {
      const updatedLocation = location === '' ? 'Remote' : location;

      const updatedlogoUrl = req.body.logoUrl
        ? req.body.logoUrl
        : 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250';

      const jobListing = await Job.findById(jobId);

      if (!jobListing) {
        return res.status(404).json({
          status: 'Failed',
          message: 'Job Listing not found',
        });
      } else {
        (jobListing.companyName = companyName),
          (jobListing.logoUrl = updatedlogoUrl),
          (jobListing.jobPostion = jobPostion),
          (jobListing.monthlySalary = monthlySalary),
          (jobListing.jobType = jobType),
          (jobListing.remoteOrOffice = remoteOrOffice),
          (jobListing.location = updatedLocation),
          (jobListing.jobDescription = jobDescription),
          (jobListing.aboutCompany = aboutCompany),
          (jobListing.skillsRequired = skillsRequired),
          (jobListing.information = information),
          await jobListing.save();
        res.status(200).json({
          status: 'Success',
          message: 'Job Listing Updated successfully',
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Something went wrong while updating',
    });
  }
};

const filterJob = async (req, res) => {
  try {
    const { skills, search } = req.query;

    const filter = {};
    if (skills) filter.skillsRequired = { $in: skills.split(',') };
    if (search) filter.jobPostion = new RegExp(search, 'i');

    const jobs = await Job.find(filter);
    console.log(jobs);

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Something went wrong while searching',
    });
  }
};

const getJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Job not found',
      });
    }
    res.status(200).json({ job });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

module.exports = { addJob, updateJob, filterJob, getJob };
