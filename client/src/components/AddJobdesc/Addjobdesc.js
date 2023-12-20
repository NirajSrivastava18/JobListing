import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import axios from 'axios';
import styles from './Addjobdesc.module.css';

const initalJobDetails = {
  companyName: '',
  logoUrl: '',
  jobPosition: '',
  monthlySalary: '',
  jobType: 'Full-Time',
  remoteOrOffice: 'In-Office',
  location: '',
  jobDescription: '',
  aboutCompany: '',
  skillsRequired: '',
  information: '',
};

const initalErrors = {
  companyName: '',
  logoUrl: '',
  jobPosition: '',
  monthlySalary: '',
  jobType: '',
  remoteOrOffice: '',
  location: '',
  jobDescription: '',
  aboutCompany: '',
  skillsRequired: '',
  information: '',
};

const Addjob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const jobIdToUpdate = queryParams.get('id');
  const [jobDetails, setJobDetails] = useState(initalJobDetails);
  const [error, setError] = useState(initalErrors);

  const token = localStorage.getItem('authtoken');

  const [authorization, setAuthorization] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthorization(true);
    }
  }, [token]);

  const onChangeHandler = (fieldName, value) => {
    const updateError = { ...error };
    if (
      value.trim() === '' &&
      [
        'companyName',
        'logoUrl',
        'jobPosition',
        'monthlySalary',
        'jobType',
        'location',
        'remoteOrOffice',
        'jobDescription',
        'aboutCompany',
        'skillsRequired',
        'information',
      ].includes(fieldName)
    ) {
      updateError[fieldName] = `Please enter a vaild ${fieldName}`;
    } else {
      updateError[fieldName] = '';
    }

    if (fieldName === 'monthlySalary') {
      if (value !== '' && isNaN(value)) {
        updateError[fieldName] = 'Monthly salary must be a number';
      }
    }
    if (fieldName === 'skillsRequired') {
      const skillsArray = value.split(',').map((skill) => skill.trim());
      setJobDetails((prevJobDetails) => ({
        ...prevJobDetails,
        [fieldName]: skillsArray,
      }));
    } else {
      setJobDetails((prevJobDetails) => ({
        ...prevJobDetails,
        [fieldName]: value,
      }));
    }
    setError(updateError);
  };

  useEffect(() => {
    if (jobIdToUpdate) {
      console.log(jobIdToUpdate);
      axios
        .get(`http://localhost:5000/job/${jobIdToUpdate}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('UPDATE');
          console.log(data);
          console.log(data.jobId);
          setJobDetails(data?.job);
        })
        .catch((err) => console.log(err));
    }
  }, [jobIdToUpdate]);

  const onSubmitHandler = async () => {
    const updateErrors = {
      companyName:
        jobDetails.companyName?.trim() === ''
          ? 'Please enter a valid company name.'
          : '',
      logoUrl:
        jobDetails.logoUrl?.trim() === ''
          ? 'Please enter a valid logo URL.'
          : '',
      jobPosition:
        jobDetails.jobPosition?.trim() === ''
          ? 'Please enter a valid job position'
          : '',
      monthlySalary:
        jobDetails.monthlySalary === ''
          ? 'Please enter a valid monthly salary.'
          : isNaN(jobDetails.monthlySalary)
          ? 'Monthly salary must be a number.'
          : '',
      jobDescription:
        jobDetails.jobDescription?.trim() === ''
          ? 'Please enter a valid job description'
          : '',
      location:
        jobDetails.location?.trim() === ''
          ? 'Please enter a valid location'
          : '',
      aboutCompany:
        jobDetails.aboutCompany?.trim() === ''
          ? 'Please enter a valid about the company'
          : '',
      skillsRequired:
        jobDetails.skillsRequired?.length === 0
          ? 'Please enter the skills required'
          : '',
      information:
        jobDetails.information === ''
          ? 'please enter the addtional information'
          : '',
    };
    setError(updateErrors);

    const hasError =
      Object.values(updateErrors).filter((error) => error !== '').length > 0;

    if (!hasError) {
      console.log(JSON.stringify(jobDetails));
      try {
        const url = jobIdToUpdate
          ? `http://localhost:5000/updatejob/${jobIdToUpdate}`
          : 'http://localhost:5000/addjob';

        const config = {
          method: jobIdToUpdate ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobDetails),
        };

        const response = await axios(url, config);
        console.log(config);
        console.log(response);
        if (!jobIdToUpdate) {
          setJobDetails(initalJobDetails);
        }
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
  };

  return (
    <>
      {authorization && (
        <div className={styles.container}>
          <div className={styles.heading}>
            <h2>Add Job Description</h2>
          </div>
          <div className={styles.InputContainer}>
            <label>Company Name</label>
            <input
              type="text"
              value={jobDetails.companyName}
              placeholder="Enter your company name here"
              onChange={(e) => onChangeHandler('companyName', e.target.value)}
            />
          </div>
          {error.companyName && (
            <p className={styles.error}>{error.companyName}</p>
          )}
          <div className={styles.InputContainer}>
            <label>Add logo URL</label>
            <input
              type="text"
              value={jobDetails.logoUrl}
              placeholder="Enter the link"
              onChange={(e) => onChangeHandler('logoUrl', e.target.value)}
            />
          </div>
          {error.logoUrl && <p className={styles.error}>{error.logoUrl}</p>}
          <div className={styles.InputContainer}>
            <label>Job Position</label>
            <input
              type="text"
              value={jobDetails.jobPosition}
              placeholder="Enter Job Position"
              onChange={(e) => onChangeHandler('jobPosition', e.target.value)}
            />
          </div>
          {error.jobPosition && (
            <p className={styles.error}>{error.jobPosition}</p>
          )}
          <div className={styles.InputContainer}>
            <label>Monthly Salary</label>
            <input
              type="number"
              min="0"
              value={jobDetails.monthlySalary}
              placeholder="Enter Amount in rupees"
              onChange={(e) => onChangeHandler('monthlySalary', e.target.value)}
            />
          </div>
          {error.monthlySalary && (
            <p className={styles.error}>{error.monthlySalary}</p>
          )}
          <div className={styles.InputContainer}>
            <label>Job Type</label>
            <DropDown
              className={styles.DropDown}
              options={['Full Time', 'Part Time']}
              value={jobDetails.jobType}
              onChange={(value) => onChangeHandler('jobType', value)}
            />
          </div>
          {error.jobType && <p className={styles.error}>{error.jobType}</p>}
          <div className={styles.InputContainer}>
            <label>Remote/Office</label>
            <DropDown
              className={styles.DropDown}
              options={['Remote', 'In-Office']}
              value={jobDetails.remoteOrOffice}
              onChange={(value) => onChangeHandler('remoteOrOffice', value)}
            />
          </div>
          {error.remoteOrOffice && (
            <p className={styles.error}>{error.remoteOrOffice}</p>
          )}
          <div className={styles.InputContainer}>
            <label>Location</label>
            <input
              type="text"
              value={jobDetails.location}
              placeholder="location"
              onChange={(e) => onChangeHandler('location', e.target.value)}
            />
          </div>
          {error.location && <p className={styles.error}>{error.location}</p>}
          <div className={styles.InputContainer}>
            <label>Job Description</label>
            <textarea
              type="text"
              value={jobDetails.jobDescription}
              placeholder="Type the job description"
              onChange={(e) =>
                onChangeHandler('jobDescription', e.target.value)
              }
            />
          </div>
          {error.jobDescription && (
            <p className={styles.error}>{error.jobDescription}</p>
          )}
          <div className={styles.InputContainer}>
            <label>About Company</label>
            <textarea
              type="text"
              value={jobDetails.aboutCompany}
              placeholder="Type about your company"
              onChange={(e) => onChangeHandler('aboutCompany', e.target.value)}
            />
          </div>
          {error.aboutCompany && (
            <p className={styles.error}>{error.aboutCompany}</p>
          )}
          <div className={styles.InputContainer}>
            <label>Skills Required</label>
            <input
              type="text"
              value={jobDetails.skillsRequired}
              placeholder="Enter the must have skills"
              onChange={(e) =>
                onChangeHandler('skillsRequired', e.target.value)
              }
            />
          </div>
          {error.skillsRequired && (
            <p className={styles.error}>{error.skillsRequired}</p>
          )}
          <div className={styles.InputContainer}>
            <label>information</label>
            <input
              type="text"
              value={jobDetails.information}
              placeholder="Enter the additional information"
              onChange={(e) => onChangeHandler('information', e.target.value)}
            />
          </div>
          {error.information && (
            <p className={styles.error}>{error.information}</p>
          )}
          <div className={styles.ButtonContainer}>
            <button
              type="Cancel"
              className={styles.cancel}
              onClick={() => navigate('/jobs')}
            >
              Cancel
            </button>
            <button
              type="Submit"
              className={styles.Submit}
              onClick={onSubmitHandler}
            >
              {jobIdToUpdate ? 'Update Job' : '+ Add Job'}
            </button>
          </div>
        </div>
      )}
      {!authorization && <p> Please login or register to access this page !</p>}
    </>
  );
};

export default Addjob;
