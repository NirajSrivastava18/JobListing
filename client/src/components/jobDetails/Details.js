import React, { useEffect, useState } from 'react';
import JobType from '../../assets/jobtype.png';
import Money from '../../assets/money.png';
import NavBar from '../Navbar/NavBar';
import styles from './Details.module.css';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duration, setDuration] = useState();
  const [job, setJob] = useState([]);

  const createdAtDate = new Date(job.createdAt);
  const dateNow = new Date();
  const durations = dateNow - createdAtDate;
  const seconds = 24 * 60 * 60 * 1000;
  const durationInDays = Math.floor(durations / seconds);
  console.log(durationInDays);

  const token = localStorage.getItem('authtoken');
  const [authorization, setAuthorization] = useState();
  const handleTokenDelete = () => {
    const token = localStorage.getItem('authtoken');
    if (!token) {
      setAuthorization(false);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleTokenDelete);
    return () => {
      window.removeEventListener('storage', handleTokenDelete);
    };
  }, []);
  useEffect(() => {
    try {
      axios
        .get(`https://joblisting-h5hr.onrender.com/job/${id}`)
        .then((res) => {
          setJob(res.data.job);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  console.log(job);
  useEffect(() => {
    if (token) {
      setAuthorization(true);
    } else {
      setAuthorization(false);
    }
  }, [token]);

  const durationDisplay = () => {
    let duration;
    if (durationInDays === 0) {
      duration = 'Today';
    } else if (durationInDays !== 0 && durationInDays < 7) {
      duration = `${durationInDays} days ago`;
    } else if (durationInDays > 7) {
      let durationInWeeks = Math.round(durationInDays / 7);
      duration = `${durationInWeeks} weeks ago`;
    }
    return duration;
  };

  useEffect(() => {
    const duration = durationDisplay();
    setDuration(duration);
  }, [job]);
  console.log(job._id);

  const handleEdit = (jobId) => {
    navigate(`/addjob?id=${jobId}`);
  };

  return (
    <>
      <NavBar />
      <div className={styles.Details}>
        <div className={styles.Overview}>
          <h3>
            {job.jobPosition} {job.jobType} job/intership at {job.companyName}
          </h3>
        </div>
        <div className={styles.jobContainer}>
          <div className={styles.JobDetails}>
            <div className={styles.JobHeading}>
              <span>{duration}</span>.<span>{job.jobType}</span>
              {authorization && (
                <>
                  <img className={styles.logo} src={job.logoUrl} alt="job" />
                  <span>{job.companyName} </span>
                </>
              )}
            </div>
            {authorization && (
              <>
                <div className={styles.editjobs}>
                  <button
                    className={styles.Edit}
                    onClick={() => handleEdit(job._id)}
                  >
                    Edit job
                  </button>
                </div>
              </>
            )}
          </div>
          <h2 className={styles.jobPosition}>{job.jobPosition}</h2>
          <p className={styles.joblocation}>{job.location} | India</p>
          <div className={styles.jobinfo}>
            <div>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginBottom: '5px',
                }}
              >
                <img src={Money} alt="money" />
                Salary
              </span>
              <h3>Rs {job.monthlySalary}/month</h3>
            </div>
            <div>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginBottom: '5px',
                }}
              >
                <img src={JobType} alt="jobtype" />
                Job Type
              </span>
              <h3>{job.jobType}</h3>
            </div>
          </div>

          <h4 className={styles.head}>AboutCompany</h4>
          <p className={styles.Para}>{job.aboutCompany}</p>
          <h4 className={styles.head}>About the job/internship</h4>
          <p className={styles.Para}>{job.jobDescription}</p>
          <h4 className={styles.head}>Skills Required</h4>
          <div className={styles.Skillstagss}>
            {job.skillsRequired?.map((skills, index) => (
              <span className={styles.SkillTG} key={index}>
                {skills}
              </span>
            ))}
          </div>
          <h4 className={styles.head}>Additional Information</h4>
          <p className={styles.Para}>{job.information}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
