import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JobList.module.css';
import Flag from '../../assets/INflag.png';
import People from '../../assets/people.png';
import Rupees from '../../assets/rupees.png';
import Navbar from '../Navbar/NavBar';
import DropDown from '../DropDown/DropDown';
import FilterOption from '../FilterOpt/FilterOptions';
import SearchIcon from '../../assets/search.png';
import axios from 'axios';

const skillsArray = [
  'C',
  'C++',
  'Java',
  'HTML',
  'CSS',
  'JavaScript',
  'Reactjs',
  'Node',
  'express',
  'Python',
  'MongoDB',
];
const JobList = () => {
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState('');
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('authtoken');
  const [authorization, setAuthorization] = useState(false);

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
    if (token) {
      setAuthorization(true);
    } else {
      setAuthorization(false);
    }
  }, [token]);

  useEffect(() => {
    let skillQuery = '';
    let positionQuery = '';
    if (skills.length > 0) {
      skillQuery = `skills=${skills.join(',')}`;
    }
    console.log(skillQuery);
    if (searchTerms) {
      positionQuery = `searchTerms=${searchTerms} `;
    }
    const searchQuery = [skillQuery, positionQuery].filter(Boolean).join('&');
    console.log(searchQuery);

    axios
      .get(`https://joblisting-h5hr.onrender.com/job?${searchQuery}`)
      .then((data) => {
        setJobs(data.data.jobs);
      })
      .catch((err) => console.log(err));
  }, [skills, searchTerms]);

  const handleSelectChange = (selectedValue) => {
    const skill = selectedValue;
    if (skill && !skills.includes(skill)) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    }
  };

  let onClickViewDetails = (id) => {
    localStorage.setItem('job_id', id);
    navigate(`/jobs/${id}`);
  };

  const handleEdit = (jobId) => {
    navigate(`/addjob?id=${jobId}`);
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const clearSkills = () => {
    setSkills([]);
  };
  const handleSearch = (searchValue) => {
    setSearchTerms(searchValue);
  };

  const onSearchSubmit = (searchValue) => {
    handleSearch(searchValue);
  };

  return (
    <>
      <Navbar />
      <div className={styles.JobsContainer1}>
        <div className={styles.SearchContainer}>
          <div className={styles.searchBar}>
            <img src={SearchIcon} alt="searchicon" />
            <input
              type="text"
              placeholder="Type any job title"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onSearchSubmit(event.target.value);
                }
              }}
            />
          </div>
          <div className={styles.skillsDropdown}>
            <div className={styles.SkillsOptions}>
              <DropDown
                filter="filter"
                options={skillsArray}
                onChange={(selectedValue) => {
                  handleSelectChange(selectedValue);
                }}
              />
              <div className={styles.FilterOptionContainer}>
                {skills.length > 0 &&
                  skills.map((skill) => (
                    <FilterOption
                      key={skill}
                      value={skill}
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  ))}
              </div>
            </div>
            {skills.length > 0 && (
              <button
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#ed5353',
                  position: 'absolute',
                  top: '180px',
                  right: '200px',
                  fontSize: '1.2em',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
                onClick={clearSkills}
              >
                clear
              </button>
            )}
            {
              <div className={styles.AddsjobButton}>
                {authorization && (
                  <button
                    className={styles.AddjobButton}
                    onClick={() => navigate('/addjob')}
                  >
                    + Add Job
                  </button>
                )}
              </div>
            }
          </div>
        </div>
        {jobs.length > 0 &&
          jobs.map((job) => (
            <div className={styles.JobsContainer2} key={job._id}>
              <img
                src={job.logoUrl}
                className={styles.logoUrl}
                alt={job.companyName}
              />

              <div className={styles.jobdesc}>
                <h3>{job.jobPosition}</h3>
                <div className={styles.jobdata2}>
                  <div className={styles.jobdesc2}>
                    <img src={People} alt="people" />
                    <span>11-50</span>
                  </div>
                  <div className={styles.jobdesc2}>
                    <img src={Rupees} alt="rupees" />
                    <span>{job.monthlySalary}</span>
                  </div>
                  <div className={styles.jobdesc2}>
                    <img src={Flag} alt="Flag" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className={styles.jobdesc3}>
                  <span>{job.remoteOrOffice}</span>
                  <span>{job.jobType}</span>
                </div>
              </div>
              <div className={styles.jobSkills}>
                <div className={styles.Skills}>
                  {job.skillsRequired.map((skill) => (
                    <p className={styles.SkillsTag} key={skill}>
                      {skill}
                    </p>
                  ))}
                </div>
                <div className={styles.Buttons}>
                  {authorization && (
                    <button
                      onClick={() => handleEdit(job._id)}
                      className={styles.Edit}
                    >
                      Edit Job
                    </button>
                  )}
                  <button
                    className={styles.ViewButton}
                    onClick={() => onClickViewDetails(job._id)}
                  >
                    ViewDetails
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default JobList;
