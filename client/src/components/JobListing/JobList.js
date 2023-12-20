import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JobList.module.css';
import Navbar from '../Navbar/NavBar';
import DropDown from '../DropDown/DropDown';
import FilterOption from '../FilterOpt/FilterOptions';
import SearchIcon from '../../assets/search.png';

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

  const handleSelectChange = (selectedValue) => {
    const skill = selectedValue;
    if (skill && !skills.includes(skill)) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    }
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
      <div className={styles.JobsContainer}>
        <div className={styles.SearchContainer}>
          <div className={styles.searchBar}>
            <img src={SearchIcon} alt="searchicon" />
            <input
              type="text"
              placeholder="Type any job title"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearchSubmit(e.target.value);
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
                  bottom: '20px',
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
      </div>
    </>
  );
};

export default JobList;
